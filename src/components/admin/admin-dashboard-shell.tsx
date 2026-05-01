"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/layout/container";
import { BOOKING_SLOT_LABELS } from "@/lib/booking-api";
import { fetchAdminBookings, fetchAdminSession, logoutAdmin, updateAdminBookingStatus } from "@/lib/admin-api";
import type { AdminBookingItem, AdminSessionData, BackendBookingStatus } from "@/types/site";

const SLOT_TIME_RANGES = {
  morning: '8:00-11:00',
  afternoon: '12:00-15:00',
  evening: '16:00-19:00',
} as const;

const LOGIN_PATH = '/muhely-belepes';

const STATUS_BADGE_STYLES: Record<string, string> = {
  pending: 'border-amber-200 bg-amber-50 text-amber-900',
  confirmed: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  cancelled: 'border-rose-200 bg-rose-50 text-rose-900',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Függőben',
  confirmed: 'Megerősített',
  cancelled: 'Törölt',
};

export function AdminDashboardShell() {
  const router = useRouter();
  const [session, setSession] = useState<AdminSessionData | null>(null);
  const [bookings, setBookings] = useState<AdminBookingItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeBookingAction, setActiveBookingAction] = useState<{ bookingId: number; status: Extract<BackendBookingStatus, 'confirmed' | 'cancelled'>; } | null>(null);
  const [cancelTarget, setCancelTarget] = useState<AdminBookingItem | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const activeSession = await fetchAdminSession();

        if (!isMounted) {
          return;
        }

        if (!activeSession) {
          router.replace(LOGIN_PATH);
          return;
        }

        setSession(activeSession);

        const bookingsResult = await fetchAdminBookings(selectedStatus || undefined);

        if (!isMounted) {
          return;
        }

        setBookings(bookingsResult.data);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : 'Nem sikerült betölteni az admin felületet.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [router, selectedStatus]);

  const stats = useMemo(() => {
    return {
      total: bookings.length,
      pending: bookings.filter((booking) => booking.status === 'pending').length,
      confirmed: bookings.filter((booking) => booking.status === 'confirmed').length,
      cancelled: bookings.filter((booking) => booking.status === 'cancelled').length,
    };
  }, [bookings]);

  async function refreshBookings(): Promise<void> {
    const bookingsResult = await fetchAdminBookings(selectedStatus || undefined);
    setBookings(bookingsResult.data);
  }

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logoutAdmin();
    } finally {
      router.push(LOGIN_PATH);
    }
  }

  async function handleBookingStatusUpdate(bookingId: number, status: Extract<BackendBookingStatus, 'confirmed' | 'cancelled'>) {
    setErrorMessage(null);
    setActiveBookingAction({ bookingId, status });

    try {
      await updateAdminBookingStatus(bookingId, status);
      await refreshBookings();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Nem sikerült frissíteni a foglalás állapotát.');
    } finally {
      setActiveBookingAction(null);
    }
  }

  async function handleConfirmCancellation() {
    if (!cancelTarget) {
      return;
    }

    await handleBookingStatusUpdate(cancelTarget.id, 'cancelled');
    setCancelTarget(null);
  }

  return (
    <>
      <section className="section-space">
        <Container>
          <div className="panel p-5 sm:p-6 xl:p-8">
            <div className="flex flex-col gap-4 border-b border-border/60 pb-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow">Admin felület</p>
                <h1 className="headline mt-4 text-3xl text-slate-900 sm:text-4xl">Foglalások áttekintése</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                  Itt látszanak a beérkező igények és az aktuális foglalási állapotok. Innen könnyen áttekinthetők a függőben lévő, megerősített és lezárt kérések is.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="rounded-md border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground">
                  <strong>Belépve:</strong> {session?.display_name ?? 'Admin'}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="button-secondary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoggingOut ? 'Kilépés...' : 'Kijelentkezés'}
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-md border border-border/70 bg-white/60 p-4">
                <p className="text-sm text-muted">Összes foglalás</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{stats.total}</p>
              </div>
              <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm text-amber-900/80">Függőben</p>
                <p className="mt-3 text-3xl font-semibold text-amber-900">{stats.pending}</p>
              </div>
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm text-emerald-900/80">Megerősített</p>
                <p className="mt-3 text-3xl font-semibold text-emerald-900">{stats.confirmed}</p>
              </div>
              <div className="rounded-md border border-rose-200 bg-rose-50 p-4">
                <p className="text-sm text-rose-900/80">Törölt</p>
                <p className="mt-3 text-3xl font-semibold text-rose-900">{stats.cancelled}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="grid gap-2 text-sm font-medium text-foreground sm:min-w-[240px]">
                Szűrés státusz szerint
                <select
                  value={selectedStatus}
                  onChange={(event) => setSelectedStatus(event.target.value)}
                  className="rounded-md border border-border/70 bg-white px-4 py-3 text-sm"
                >
                  <option value="">Minden foglalás</option>
                  <option value="pending">Függőben</option>
                  <option value="confirmed">Megerősített</option>
                  <option value="cancelled">Törölt</option>
                </select>
              </label>

              <Link href="/" className="text-sm text-muted transition hover:text-foreground">
                Vissza a főoldalra
              </Link>
            </div>

            {errorMessage ? (
              <p className="mt-6 rounded-md border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                {errorMessage}
              </p>
            ) : null}

            {isLoading ? (
              <p className="mt-6 text-sm text-muted">Admin adatok betöltése folyamatban...</p>
            ) : null}

            {!isLoading && !errorMessage ? (
              <div className="mt-6 space-y-4">
                {bookings.length > 0 ? (
                  bookings.map((booking) => {
                    const isPendingBooking = booking.status === 'pending';
                    const isSubmittingForThisBooking = activeBookingAction?.bookingId === booking.id;

                    return (
                      <article key={booking.id} className="rounded-md border border-border/70 bg-white/65 p-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <h2 className="text-xl font-semibold text-slate-900">{booking.customer_name}</h2>
                            <p className="mt-2 text-sm text-muted">{booking.service_type ?? 'Nincs megadva szolgáltatás'}</p>
                          </div>
                          <span
                            className={`rounded-md border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${STATUS_BADGE_STYLES[booking.status] ?? 'border-border/70 bg-surface text-foreground'}`}
                          >
                            {STATUS_LABELS[booking.status] ?? booking.status}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Elérhetőség</p>
                            <p className="mt-2 text-sm leading-6 text-foreground">{booking.email}</p>
                            <p className="text-sm leading-6 text-foreground">{booking.phone}</p>
                          </div>

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Cím</p>
                            <p className="mt-2 text-sm leading-6 text-foreground">{booking.address}</p>
                          </div>

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Időpontok</p>
                            <div className="mt-2 space-y-2">
                              {booking.slots.map((slotItem) => (
                                <p key={`${booking.id}-${slotItem.booking_date}-${slotItem.slot}`} className="text-sm leading-6 text-foreground">
                                  {slotItem.booking_date} - {BOOKING_SLOT_LABELS[slotItem.slot]} ({SLOT_TIME_RANGES[slotItem.slot]})
                                </p>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Megjegyzés</p>
                            <p className="mt-2 text-sm leading-6 text-foreground">
                              {booking.message && booking.message.trim() !== '' ? booking.message : 'Nincs külön megjegyzés.'}
                            </p>
                          </div>
                        </div>

                        {isPendingBooking ? (
                          <div className="mt-5 flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:flex-wrap">
                            <button
                              type="button"
                              onClick={() => handleBookingStatusUpdate(booking.id, 'confirmed')}
                              disabled={isSubmittingForThisBooking}
                              className="inline-flex items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isSubmittingForThisBooking && activeBookingAction?.status === 'confirmed' ? 'Elfogadás...' : 'Elfogadom'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setCancelTarget(booking)}
                              disabled={isSubmittingForThisBooking}
                              className="inline-flex items-center justify-center rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-900 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Törlöm
                            </button>
                          </div>
                        ) : null}
                      </article>
                    );
                  })
                ) : (
                  <p className="rounded-md border border-border/70 bg-white/60 px-4 py-4 text-sm text-muted">
                    Ehhez a szűréshez most nincs megjeleníthető foglalás.
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {cancelTarget ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(23,21,21,0.48)] px-4">
          <div className="panel w-full max-w-xl p-6 sm:p-7">
            <p className="eyebrow">Megerősítés</p>
            <h2 className="headline mt-4 text-2xl text-slate-900 sm:text-3xl">Biztosan törölni szeretnéd ezt az ajánlatkérést?</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              A törlés itt valójában azt jelenti, hogy a foglalás státusza <strong>törölt</strong> lesz. Ez a művelet a(z) <strong>{cancelTarget.customer_name}</strong> nevű ügyfél kérésére fog vonatkozni.
            </p>
            <div className="mt-6 rounded-md border border-border/70 bg-white/60 px-4 py-4 text-sm leading-7 text-foreground">
              <p><strong>Szolgáltatás:</strong> {cancelTarget.service_type ?? 'Nincs megadva szolgáltatás'}</p>
              <p><strong>Email:</strong> {cancelTarget.email}</p>
              <p><strong>Telefon:</strong> {cancelTarget.phone}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setCancelTarget(null)}
                disabled={activeBookingAction?.bookingId === cancelTarget.id}
                className="button-secondary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                Mégse
              </button>
              <button
                type="button"
                onClick={handleConfirmCancellation}
                disabled={activeBookingAction?.bookingId === cancelTarget.id}
                className="inline-flex items-center justify-center rounded-md border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-900 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {activeBookingAction?.bookingId === cancelTarget.id ? 'Törlés...' : 'Igen, törlöm'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
