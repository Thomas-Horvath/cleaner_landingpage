import type {
  BackendBookingStatus,
  BookingFormPayload,
  BookingSlotApiItem,
  BookingSlotLabel,
  BookingSlotState,
} from '@/types/site';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api';

export const BOOKING_SLOT_LABELS: Record<BookingSlotLabel, string> = {
  morning: 'Délelőtt',
  afternoon: 'Délután',
  evening: 'Este',
};

export type BookingApiSource = 'api' | 'fallback';

export type BookingSlotsResult = {
  slots: BookingSlotState[];
  source: BookingApiSource;
};

export type BookingSubmitResult = {
  source: BookingApiSource;
};

function isNetworkLikeError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return (
    message.includes('failed to fetch') ||
    message.includes('fetch failed') ||
    message.includes('networkerror') ||
    message.includes('load failed')
  );
}

async function fetchSlotsByStatus(
  dateFrom: string,
  dateTo: string,
  status: BackendBookingStatus
): Promise<BookingSlotApiItem[]> {
  const searchParams = new URLSearchParams({
    date_from: dateFrom,
    date_to: dateTo,
    status,
  });

  const response = await fetch(`${API_BASE_URL}/booking-slots.php?${searchParams.toString()}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Nem sikerült lekérni a foglalási slotokat a backendből.');
  }

  const payload = (await response.json()) as {
    success: boolean;
    data?: BookingSlotApiItem[];
  };

  if (!payload.success || !Array.isArray(payload.data)) {
    throw new Error('A slot API válasza nem a várt formátumban érkezett.');
  }

  return payload.data;
}

export async function fetchWeekBookingSlots(dateFrom: string, dateTo: string): Promise<BookingSlotsResult> {
  try {
    // Két külön kérésből rakjuk össze a naptár állapotát:
    // - confirmed: már foglalt idősávok
    // - pending: még jóváhagyásra váró időpontok
    const [confirmedSlots, pendingSlots] = await Promise.all([
      fetchSlotsByStatus(dateFrom, dateTo, 'confirmed'),
      fetchSlotsByStatus(dateFrom, dateTo, 'pending'),
    ]);

    const slots = [...confirmedSlots, ...pendingSlots].map((slotItem) => ({
      bookingDate: slotItem.booking_date,
      slot: slotItem.slot,
      status: slotItem.status as BookingSlotState['status'],
      customerName: slotItem.customer_name,
      serviceType: slotItem.service_type,
    }));

    return {
      slots,
      source: 'api',
    };
  } catch (error) {
    if (!isNetworkLikeError(error)) {
      throw error;
    }

    // Ha a backend nem elérhető, nem dobunk hibát a frontend preview-n.
    // Ilyenkor üres állapotú naptárral működünk tovább.
    return {
      slots: [],
      source: 'fallback',
    };
  }
}

export async function createPendingBooking(payload: BookingFormPayload): Promise<BookingSubmitResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings-create.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseBody = (await response.json()) as {
      success: boolean;
      message?: string;
    };

    if (!response.ok || !responseBody.success) {
      throw new Error(responseBody.message ?? 'Nem sikerült a foglalás elküldése.');
    }

    return {
      source: 'api',
    };
  } catch (error) {
    if (!isNetworkLikeError(error)) {
      throw error;
    }

    // Preview vagy backend nélküli környezetben a frontend így is használható marad.
    return {
      source: 'fallback',
    };
  }
}
