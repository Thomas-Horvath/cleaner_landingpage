import type { AdminBookingItem, AdminLoginPayload, AdminSessionData } from '@/types/site';

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

    if (!parsedValue.username || !parsedValue.display_name) {
      return null;
    }

    return parsedValue;
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

export async function fetchAdminBookings(status?: string): Promise<AdminBookingsResult> {
  const searchParams = new URLSearchParams();

  if (status) {
    searchParams.set('status', status);
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
  }>(response);

  if (response.status === 401) {
    clearAdminSessionFromStorage();
    throw new Error('A munkamenet lejárt vagy nincs érvényes belépés.');
  }

  if (!response.ok || !responseBody.success || !responseBody.data || !responseBody.pagination) {
    throw new Error(responseBody.message ?? 'Nem sikerült lekérni a foglalásokat.');
  }

  return {
    data: responseBody.data,
    pagination: responseBody.pagination,
  };
}
