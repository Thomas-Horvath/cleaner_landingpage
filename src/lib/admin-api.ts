import type {
  AdminBookingItem,
  AdminBookingSummary,
  AdminLoginPayload,
  AdminSessionData,
  AdminSlotAvailabilityItem,
  BackendBookingStatus,
  BookingSlotApiItem,
  BookingSlotLabel,
} from '@/types/site';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api';
const ADMIN_SESSION_STORAGE_KEY = 'cleaner_admin_session';

export type AdminBookingsResult = {
  data: AdminBookingItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  summary: AdminBookingSummary;
};

export function saveAdminSessionToStorage(sessionData: AdminSessionData): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(sessionData));
}

export function getAdminSessionFromStorage(): AdminSessionData | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as AdminSessionData;

    if (!parsedValue.username) {
      return null;
    }

    return {
      username: parsedValue.username,
      display_name: typeof parsedValue.display_name === 'string' && parsedValue.display_name.trim() !== ''
        ? parsedValue.display_name
        : null,
      logged_in_at: parsedValue.logged_in_at ?? null,
    };
  } catch {
    return null;
  }
}

export function clearAdminSessionFromStorage(): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

export async function loginAdmin(payload: AdminLoginPayload): Promise<AdminSessionData> {
  const response = await fetch(`${API_BASE_URL}/admin-login.php`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseBody = await parseJsonResponse<{
    success: boolean;
    message?: string;
    data?: AdminSessionData;
  }>(response);

  if (!response.ok || !responseBody.success || !responseBody.data) {
    throw new Error(responseBody.message ?? 'Nem sikerült a belépés.');
  }

  saveAdminSessionToStorage(responseBody.data);

  return responseBody.data;
}

export async function fetchAdminSession(): Promise<AdminSessionData | null> {
  const response = await fetch(`${API_BASE_URL}/admin-session.php`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
  });

  const responseBody = await parseJsonResponse<{
    success: boolean;
    authenticated: boolean;
    data?: AdminSessionData | null;
  }>(response);

  if (!response.ok || !responseBody.success) {
    throw new Error('Nem sikerült lekérni az admin session állapotát.');
  }

  if (!responseBody.authenticated || !responseBody.data) {
    clearAdminSessionFromStorage();
    return null;
  }

  saveAdminSessionToStorage(responseBody.data);

  return responseBody.data;
}

export async function logoutAdmin(): Promise<void> {
  await fetch(`${API_BASE_URL}/admin-logout.php`, {
    method: 'POST',
    credentials: 'include',
  });

  clearAdminSessionFromStorage();
}

export async function fetchAdminBookings(options: {
  status?: string;
  page?: number;
  limit?: number;
} = {}): Promise<AdminBookingsResult> {
  const searchParams = new URLSearchParams();

  if (options.status) {
    searchParams.set('status', options.status);
  }

  if (typeof options.page === 'number') {
    searchParams.set('page', String(options.page));
  }

  if (typeof options.limit === 'number') {
    searchParams.set('limit', String(options.limit));
  }

  const response = await fetch(`${API_BASE_URL}/admin-bookings.php?${searchParams.toString()}`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
  });

  const responseBody = await parseJsonResponse<{
    success: boolean;
    message?: string;
    data?: AdminBookingItem[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    summary?: AdminBookingSummary;
  }>(response);

  if (response.status === 401) {
    clearAdminSessionFromStorage();
    throw new Error('A munkamenet lejárt vagy nincs érvényes belépés.');
  }

  if (!response.ok || !responseBody.success || !responseBody.data || !responseBody.pagination || !responseBody.summary) {
    throw new Error(responseBody.message ?? 'Nem sikerült lekérni a foglalásokat.');
  }

  return {
    data: responseBody.data,
    pagination: responseBody.pagination,
    summary: responseBody.summary,
  };
}

async function fetchSlotsByStatusForDate(date: string, status: Extract<BackendBookingStatus, 'pending' | 'confirmed'>): Promise<BookingSlotApiItem[]> {
  const searchParams = new URLSearchParams({
    date_from: date,
    date_to: date,
    status,
  });

  const response = await fetch(`${API_BASE_URL}/booking-slots.php?${searchParams.toString()}`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
  });

  const responseBody = await parseJsonResponse<{
    success: boolean;
    message?: string;
    data?: BookingSlotApiItem[];
  }>(response);

  if (!response.ok || !responseBody.success || !responseBody.data) {
    throw new Error(responseBody.message ?? 'Nem sikerült lekérni az adott napi foglaltságot.');
  }

  return responseBody.data;
}

export async function fetchAdminSlotAvailability(date: string): Promise<AdminSlotAvailabilityItem[]> {
  const [pendingSlots, confirmedSlots] = await Promise.all([
    fetchSlotsByStatusForDate(date, 'pending'),
    fetchSlotsByStatusForDate(date, 'confirmed'),
  ]);

  return [...pendingSlots, ...confirmedSlots].map((slotItem) => ({
    id: slotItem.id,
    booking_id: slotItem.booking_id,
    booking_date: slotItem.booking_date,
    slot: slotItem.slot,
    status: slotItem.status,
    customer_name: slotItem.customer_name,
    service_type: slotItem.service_type,
  }));
}

export async function updateAdminBookingStatus(bookingId: number, status: Extract<BackendBookingStatus, 'confirmed' | 'cancelled'>): Promise<{ id: number; status: BackendBookingStatus; updated_at: string; }> {
  const response = await fetch(`${API_BASE_URL}/admin-booking-status.php`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      booking_id: bookingId,
      status,
    }),
  });

  const responseBody = await parseJsonResponse<{
    success: boolean;
    message?: string;
    data?: {
      id: number;
      status: BackendBookingStatus;
      updated_at: string;
    };
  }>(response);

  if (response.status === 401) {
    clearAdminSessionFromStorage();
    throw new Error('A munkamenet lejárt vagy nincs érvényes belépés.');
  }

  if (!response.ok || !responseBody.success || !responseBody.data) {
    throw new Error(responseBody.message ?? 'Nem sikerült frissíteni a foglalás státuszát.');
  }

  return responseBody.data;
}

export async function moveAdminBookingSlot(payload: {
  bookingId: number;
  slotId: number;
  bookingDate: string;
  slot: BookingSlotLabel;
}): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin-booking-slot-move.php`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      booking_id: payload.bookingId,
      slot_id: payload.slotId,
      booking_date: payload.bookingDate,
      slot: payload.slot,
    }),
  });

  const responseBody = await parseJsonResponse<{
    success: boolean;
    message?: string;
  }>(response);

  if (response.status === 401) {
    clearAdminSessionFromStorage();
    throw new Error('A munkamenet lejárt vagy nincs érvényes belépés.');
  }

  if (!response.ok || !responseBody.success) {
    throw new Error(responseBody.message ?? 'Nem sikerült áthelyezni az időpontot.');
  }
}

export async function addAdminBookingSlot(payload: {
  bookingId: number;
  bookingDate: string;
  slot: BookingSlotLabel;
}): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin-booking-slot-add.php`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      booking_id: payload.bookingId,
      booking_date: payload.bookingDate,
      slot: payload.slot,
    }),
  });

  const responseBody = await parseJsonResponse<{
    success: boolean;
    message?: string;
  }>(response);

  if (response.status === 401) {
    clearAdminSessionFromStorage();
    throw new Error('A munkamenet lejárt vagy nincs érvényes belépés.');
  }

  if (!response.ok || !responseBody.success) {
    throw new Error(responseBody.message ?? 'Nem sikerült új időpontot hozzáadni a foglaláshoz.');
  }
}
