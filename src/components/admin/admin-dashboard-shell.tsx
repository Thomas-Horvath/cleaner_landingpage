"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/layout/container";
import {
  addAdminBookingSlot,
  fetchAdminBookings,
  fetchAdminSession,
  fetchAdminSlotAvailability,
  logoutAdmin,
  moveAdminBookingSlot,
  updateAdminBookingStatus,
} from "@/lib/admin-api";
import { BOOKING_SLOT_LABELS } from "@/lib/booking-api";
import type {
  AdminBookingItem,
  AdminBookingSlot,
  AdminBookingSummary,
  AdminSessionData,
  AdminSlotAvailabilityItem,
  BackendBookingStatus,
  BookingSlotLabel,
} from "@/types/site";

const SLOT_TIME_RANGES = {
  morning: "8:00-11:00",
  afternoon: "12:00-15:00",
  evening: "16:00-19:00",
} as const;

const SLOT_ORDER: BookingSlotLabel[] = ["morning", "afternoon", "evening"];
const LOGIN_PATH = "/muhely-belepes";
const ITEMS_PER_PAGE = 10;

const STATUS_BADGE_STYLES: Record<string, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-900",
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-900",
  cancelled: "border-rose-200 bg-rose-50 text-rose-900",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Függőben",
  confirmed: "Megerősített",
  cancelled: "Törölt",
};

type PaginationState = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

type SlotEditorState =
  | { mode: "add"; booking: AdminBookingItem }
  | { mode: "move"; booking: AdminBookingItem; slot: AdminBookingSlot };

function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

function formatSlotLine(slotItem: AdminBookingSlot): string {
  return `${slotItem.booking_date} - ${BOOKING_SLOT_LABELS[slotItem.slot]} (${SLOT_TIME_RANGES[slotItem.slot]})`;
}

export function AdminDashboardShell() {
  function handleStatusFilterChange(nextStatus: string) {
    setSelectedStatus(nextStatus);
    setCurrentPage(1);
  }
  const router = useRouter();
  const [session, setSession] = useState<AdminSessionData | null>(null);
  const [bookings, setBookings] = useState<AdminBookingItem[]>([]);
  const [summary, setSummary] = useState<AdminBookingSummary>({ total: 0, pending: 0, confirmed: 0, cancelled: 0 });
  const [pagination, setPagination] = useState<PaginationState>({ page: 1, limit: ITEMS_PER_PAGE, total: 0, pages: 0 });
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeBookingAction, setActiveBookingAction] = useState<{ bookingId: number; status: Extract<BackendBookingStatus, "confirmed" | "cancelled"> } | null>(null);
  const [cancelTarget, setCancelTarget] = useState<AdminBookingItem | null>(null);
  const [slotEditor, setSlotEditor] = useState<SlotEditorState | null>(null);
  const [slotEditorDate, setSlotEditorDate] = useState<string>(getTomorrowDateString());
  const [slotEditorSelection, setSlotEditorSelection] = useState<BookingSlotLabel | null>(null);
  const [slotEditorAvailability, setSlotEditorAvailability] = useState<AdminSlotAvailabilityItem[]>([]);
  const [slotEditorError, setSlotEditorError] = useState<string | null>(null);
  const [isSlotEditorLoading, setIsSlotEditorLoading] = useState(false);
  const [isSlotEditorSubmitting, setIsSlotEditorSubmitting] = useState(false);


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

        const bookingsResult = await fetchAdminBookings({
          status: selectedStatus || undefined,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        });

        if (!isMounted) {
          return;
        }

        setBookings(bookingsResult.data);
        setPagination(bookingsResult.pagination);
        setSummary(bookingsResult.summary);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : "Nem sikerült betölteni az admin felületet.");
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
  }, [router, selectedStatus, currentPage]);

  useEffect(() => {
    if (!slotEditor || !slotEditorDate) {
      return;
    }

    let isMounted = true;

    async function loadAvailability() {
      setIsSlotEditorLoading(true);
      setSlotEditorError(null);

      try {
        const availability = await fetchAdminSlotAvailability(slotEditorDate);

        if (!isMounted) {
          return;
        }

        setSlotEditorAvailability(availability);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setSlotEditorAvailability([]);
        setSlotEditorError(error instanceof Error ? error.message : "Nem sikerült lekérni az adott napi foglaltságot.");
      } finally {
        if (isMounted) {
          setIsSlotEditorLoading(false);
        }
      }
    }

    loadAvailability();

    return () => {
      isMounted = false;
    };
  }, [slotEditor, slotEditorDate]);

  const visibleBookingRange = useMemo(() => {
    if (pagination.total === 0 || bookings.length === 0) {
      return null;
    }

    const from = (pagination.page - 1) * pagination.limit + 1;
    const to = from + bookings.length - 1;

    return { from, to };
  }, [bookings.length, pagination]);

  async function refreshBookings(preferredPage = currentPage): Promise<void> {
    const bookingsResult = await fetchAdminBookings({
      status: selectedStatus || undefined,
      page: preferredPage,
      limit: ITEMS_PER_PAGE,
    });

    if (bookingsResult.pagination.pages > 0 && preferredPage > bookingsResult.pagination.pages) {
      setCurrentPage(bookingsResult.pagination.pages);
      return;
    }

    setBookings(bookingsResult.data);
    setPagination(bookingsResult.pagination);
    setSummary(bookingsResult.summary);
  }

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logoutAdmin();
    } finally {
      router.push(LOGIN_PATH);
    }
  }

  async function handleBookingStatusUpdate(bookingId: number, status: Extract<BackendBookingStatus, "confirmed" | "cancelled">) {
    setErrorMessage(null);
    setActiveBookingAction({ bookingId, status });

    try {
      await updateAdminBookingStatus(bookingId, status);
      await refreshBookings();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Nem sikerült frissíteni a foglalás állapotát.");
    } finally {
      setActiveBookingAction(null);
    }
  }

  async function handleConfirmCancellation() {
    if (!cancelTarget) {
      return;
    }

    await handleBookingStatusUpdate(cancelTarget.id, "cancelled");
    setCancelTarget(null);
  }

  function openAddSlotModal(booking: AdminBookingItem) {
    setSlotEditor({ mode: "add", booking });
    setSlotEditorDate(getTomorrowDateString());
    setSlotEditorSelection(null);
    setSlotEditorAvailability([]);
    setSlotEditorError(null);
  }

  function openMoveSlotModal(booking: AdminBookingItem, slot: AdminBookingSlot) {
    setSlotEditor({ mode: "move", booking, slot });
    setSlotEditorDate(slot.booking_date);
    setSlotEditorSelection(slot.slot);
    setSlotEditorAvailability([]);
    setSlotEditorError(null);
  }

  function closeSlotEditor() {
    setSlotEditor(null);
    setSlotEditorSelection(null);
    setSlotEditorAvailability([]);
    setSlotEditorError(null);
    setIsSlotEditorSubmitting(false);
  }

  function resolveSlotState(slotOption: BookingSlotLabel) {
    if (!slotEditor) {
      return {
        isDisabled: true,
        stateLabel: "Nem elérhető",
        stateClassName: "border-border/70 bg-white text-muted",
      };
    }

    const matchingItem = slotEditorAvailability.find((slotItem) => slotItem.slot === slotOption);

    if (!matchingItem) {
      return {
        isDisabled: false,
        stateLabel: "Szabad",
        stateClassName: "border-emerald-200 bg-emerald-50 text-emerald-900",
      };
    }

    const isCurrentMoveSlot =
      slotEditor.mode === "move" &&
      matchingItem.id === slotEditor.slot.id &&
      matchingItem.booking_id === slotEditor.booking.id;

    if (isCurrentMoveSlot) {
      return {
        isDisabled: false,
        stateLabel: "Jelenlegi blokk",
        stateClassName: "border-sky-200 bg-sky-50 text-sky-900",
      };
    }

    if (matchingItem.booking_id === slotEditor.booking.id) {
      return {
        isDisabled: true,
        stateLabel: "Már ehhez a foglaláshoz tartozik",
        stateClassName: "border-stone-200 bg-stone-100 text-stone-700",
      };
    }

    if (matchingItem.status === "pending") {
      return {
        isDisabled: true,
        stateLabel: "Függőben lévő kérés foglalja",
        stateClassName: "border-amber-200 bg-amber-50 text-amber-900",
      };
    }

    return {
      isDisabled: true,
      stateLabel: "Már foglalt",
      stateClassName: "border-rose-200 bg-rose-50 text-rose-900",
    };
  }

  async function handleSubmitSlotEditor() {
    if (!slotEditor) {
      return;
    }

    if (!slotEditorDate) {
      setSlotEditorError("Válassz ki egy dátumot a módosításhoz.");
      return;
    }

    if (!slotEditorSelection) {
      setSlotEditorError("Válassz ki egy idősávot a mentéshez.");
      return;
    }

    setSlotEditorError(null);
    setIsSlotEditorSubmitting(true);

    try {
      if (slotEditor.mode === "move") {
        await moveAdminBookingSlot({
          bookingId: slotEditor.booking.id,
          slotId: slotEditor.slot.id,
          bookingDate: slotEditorDate,
          slot: slotEditorSelection,
        });
      } else {
        await addAdminBookingSlot({
          bookingId: slotEditor.booking.id,
          bookingDate: slotEditorDate,
          slot: slotEditorSelection,
        });
      }

      await refreshBookings();
      closeSlotEditor();
    } catch (error) {
      setSlotEditorError(error instanceof Error ? error.message : "Nem sikerült elmenteni a foglalás módosítását.");
    } finally {
      setIsSlotEditorSubmitting(false);
    }
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
                  Itt látszanak a beérkező igények és az aktuális foglalási állapotok. A kártyákon belül gyorsan kezelhető az elfogadás,
                  a teljes kérés törlése, illetve az időpontok áthelyezése és bővítése is.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="rounded-md border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground">
                  <strong>Belépve:</strong> {session?.display_name ?? "Admin"}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="button-secondary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoggingOut ? "Kilépés..." : "Kijelentkezés"}
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-md border border-border/70 bg-white/60 p-4">
                <p className="text-sm text-muted">Összes foglalás</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{summary.total}</p>
              </div>
              <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm text-amber-900/80">Függőben</p>
                <p className="mt-3 text-3xl font-semibold text-amber-900">{summary.pending}</p>
              </div>
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm text-emerald-900/80">Megerősített</p>
                <p className="mt-3 text-3xl font-semibold text-emerald-900">{summary.confirmed}</p>
              </div>
              <div className="rounded-md border border-rose-200 bg-rose-50 p-4">
                <p className="text-sm text-rose-900/80">Törölt</p>
                <p className="mt-3 text-3xl font-semibold text-rose-900">{summary.cancelled}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <label className="grid gap-2 text-sm font-medium text-foreground sm:min-w-[240px]">
                  Szűrés státusz szerint
                  <select
                    value={selectedStatus}
                    onChange={(event) => handleStatusFilterChange(event.target.value)}
                    className="rounded-md border border-border/70 bg-white px-4 py-3 text-sm"
                  >
                    <option value="">Minden foglalás</option>
                    <option value="pending">Függőben</option>
                    <option value="confirmed">Megerősített</option>
                    <option value="cancelled">Törölt</option>
                  </select>
                </label>

                <div className="rounded-md border border-border/70 bg-white/60 px-4 py-3 text-sm text-muted">
                  {visibleBookingRange ? (
                    <>
                      {visibleBookingRange.from}-{visibleBookingRange.to}. foglalás megjelenítve az összes {pagination.total} találatból.
                    </>
                  ) : (
                    <>Ehhez a szűréshez most nincs megjeleníthető foglalás.</>
                  )}
                </div>
              </div>

              <Link href="/" className="text-sm text-muted transition hover:text-foreground">
                Vissza a főoldalra
              </Link>
            </div>

            {errorMessage ? <p className="mt-6 rounded-md border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-900">{errorMessage}</p> : null}
            {isLoading ? <p className="mt-6 text-sm text-muted">Admin adatok betöltése folyamatban...</p> : null}

            {!isLoading && !errorMessage ? (
              <div className="mt-6 space-y-4">
                {bookings.length > 0 ? (
                  bookings.map((booking) => {
                    const isPendingBooking = booking.status === "pending";
                    const isActiveBooking = booking.status !== "cancelled";
                    const isSubmittingForThisBooking = activeBookingAction?.bookingId === booking.id;

                    return (
                      <article key={booking.id} className="rounded-md border border-border/70 bg-white/65 p-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <h2 className="text-xl font-semibold text-slate-900">{booking.customer_name}</h2>
                            <p className="mt-2 text-sm text-muted">{booking.service_type ?? "Nincs megadva szolgáltatás"}</p>
                          </div>
                          <span className={`rounded-md border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${STATUS_BADGE_STYLES[booking.status] ?? "border-border/70 bg-surface text-foreground"}`}>
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
                            <div className="mt-2 space-y-3">
                              {booking.slots.length > 0 ? (
                                booking.slots.map((slotItem) => (
                                  <div key={slotItem.id} className="rounded-md border border-border/60 bg-white/70 px-3 py-3">
                                    <p className="text-sm leading-6 text-foreground">{formatSlotLine(slotItem)}</p>
                                    {isActiveBooking ? (
                                      <button
                                        type="button"
                                        onClick={() => openMoveSlotModal(booking, slotItem)}
                                        className="mt-2 inline-flex items-center justify-center rounded-md border border-border/70 bg-white px-3 py-2 text-xs font-semibold text-foreground transition hover:border-primary/30 hover:text-primary"
                                      >
                                        Áthelyezem
                                      </button>
                                    ) : null}
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm leading-6 text-muted">Ehhez a foglaláshoz jelenleg nincs aktív időpont hozzárendelve.</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Megjegyzés</p>
                            <p className="mt-2 text-sm leading-6 text-foreground">{booking.message && booking.message.trim() !== "" ? booking.message : "Nincs külön megjegyzés."}</p>
                          </div>
                        </div>

                        {isActiveBooking ? (
                          <div className="mt-5 flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:flex-wrap">
                            {isPendingBooking ? (
                              <button
                                type="button"
                                onClick={() => handleBookingStatusUpdate(booking.id, "confirmed")}
                                disabled={isSubmittingForThisBooking}
                                className="inline-flex items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {isSubmittingForThisBooking && activeBookingAction?.status === "confirmed" ? "Elfogadás..." : "Elfogadom"}
                              </button>
                            ) : null}

                            <button
                              type="button"
                              onClick={() => openAddSlotModal(booking)}
                              className="inline-flex items-center justify-center rounded-md border border-border/70 bg-white px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary"
                            >
                              Időpont hozzáadása
                            </button>

                            {isPendingBooking ? (
                              <button
                                type="button"
                                onClick={() => setCancelTarget(booking)}
                                disabled={isSubmittingForThisBooking}
                                className="inline-flex items-center justify-center rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-900 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                Törlöm
                              </button>
                            ) : null}
                          </div>
                        ) : null}
                      </article>
                    );
                  })
                ) : (
                  <p className="rounded-md border border-border/70 bg-white/60 px-4 py-4 text-sm text-muted">Ehhez a szűréshez most nincs megjeleníthető foglalás.</p>
                )}
              </div>
            ) : null}

            {!isLoading && pagination.pages > 1 ? (
              <div className="mt-8 flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">Oldal {pagination.page} / {pagination.pages}</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((previousPage) => Math.max(1, previousPage - 1))}
                    disabled={pagination.page <= 1}
                    className="button-secondary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Előző oldal
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((previousPage) => Math.min(pagination.pages, previousPage + 1))}
                    disabled={pagination.page >= pagination.pages}
                    className="button-secondary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Következő oldal
                  </button>
                </div>
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
              A törlés itt azt jelenti, hogy a foglalás státusza <strong>törölt</strong> lesz, és a hozzá kapcsolódó időpontok újra foglalhatóvá válnak.
              Ez a művelet a(z) <strong>{cancelTarget.customer_name}</strong> nevű ügyfél kérésére fog vonatkozni.
            </p>
            <div className="mt-6 rounded-md border border-border/70 bg-white/60 px-4 py-4 text-sm leading-7 text-foreground">
              <p><strong>Szolgáltatás:</strong> {cancelTarget.service_type ?? "Nincs megadva szolgáltatás"}</p>
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
                {activeBookingAction?.bookingId === cancelTarget.id ? "Törlés..." : "Igen, törlöm"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {slotEditor ? (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-[rgba(23,21,21,0.48)] px-4 py-6 sm:py-10">
          <div className="mx-auto flex min-h-full w-full max-w-4xl items-center justify-center">
            <div className="panel w-full p-5 sm:p-6 xl:p-8">
              <div className="flex flex-col gap-4 border-b border-border/60 pb-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="eyebrow">{slotEditor.mode === "move" ? "Időpont áthelyezése" : "Új időpont hozzáadása"}</p>
                  <h2 className="headline mt-4 text-2xl text-slate-900 sm:text-3xl">{slotEditor.booking.customer_name} foglalásának szerkesztése</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                    {slotEditor.mode === "move"
                      ? "Válassz új dátumot és idősávot a kijelölt foglalási blokkhoz. A foglalt és függőben lévő blokkok nem választhatók ki."
                      : "Adj hozzá még egy időblokkot ehhez a foglaláshoz. Így egy nagyobb munka több napszakot is lefoglalhat ugyanannak az ügyfélnek."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeSlotEditor}
                  className="button-secondary inline-flex items-center justify-center px-4 py-3 text-sm font-semibold"
                >
                  Bezárom
                </button>
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="space-y-4">
                  <div className="rounded-md border border-border/70 bg-white/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Foglalás adatai</p>
                    <div className="mt-3 space-y-2 text-sm leading-7 text-foreground">
                      <p><strong>Név:</strong> {slotEditor.booking.customer_name}</p>
                      <p><strong>Szolgáltatás:</strong> {slotEditor.booking.service_type ?? "Nincs megadva szolgáltatás"}</p>
                      <p><strong>Cím:</strong> {slotEditor.booking.address}</p>
                    </div>
                  </div>

                  {slotEditor.mode === "move" ? (
                    <div className="rounded-md border border-sky-200 bg-sky-50 p-4 text-sm leading-7 text-sky-900">
                      <p className="font-semibold">Mozgatott időblokk</p>
                      <p className="mt-2">{formatSlotLine(slotEditor.slot)}</p>
                    </div>
                  ) : (
                    <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-900">
                      <p className="font-semibold">Mit csinál ez a művelet?</p>
                      <p className="mt-2">Új, külön foglalási blokk kerül ehhez az ügyfélhez. Ez akkor hasznos, ha a munka több napszakot is lefed ugyanazon vagy másik napon.</p>
                    </div>
                  )}

                  <div className="rounded-md border border-border/70 bg-white/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Jelenlegi blokkok</p>
                    <div className="mt-3 space-y-2">
                      {slotEditor.booking.slots.length > 0 ? (
                        slotEditor.booking.slots.map((slotItem) => (
                          <p key={slotItem.id} className="text-sm leading-6 text-foreground">{formatSlotLine(slotItem)}</p>
                        ))
                      ) : (
                        <p className="text-sm leading-6 text-muted">Ehhez a foglaláshoz most nincs aktív időpont rendelve.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <label className="grid gap-2 text-sm font-medium text-foreground">
                    Új dátum
                    <input
                      type="date"
                      value={slotEditorDate}
                      min={getTomorrowDateString()}
                      onChange={(event) => setSlotEditorDate(event.target.value)}
                      className="rounded-md border border-border/70 bg-white px-4 py-3 text-sm"
                    />
                  </label>

                  <div className="rounded-md border border-border/70 bg-white/60 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Idősáv kiválasztása</p>
                        <p className="mt-1 text-xs leading-6 text-muted">A színek rögtön megmutatják, melyik blokk szabad, függőben lévő vagy már foglalt.</p>
                      </div>
                      {isSlotEditorLoading ? <p className="text-xs text-muted">Foglaltság betöltése...</p> : null}
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      {SLOT_ORDER.map((slotOption) => {
                        const slotState = resolveSlotState(slotOption);
                        const isSelected = slotEditorSelection === slotOption;

                        return (
                          <button
                            key={slotOption}
                            type="button"
                            onClick={() => setSlotEditorSelection(slotOption)}
                            disabled={slotState.isDisabled}
                            className={`min-h-[154px] rounded-md border px-4 py-4 text-left transition ${slotState.stateClassName} ${isSelected ? "ring-2 ring-primary/40" : ""} disabled:cursor-not-allowed disabled:opacity-80`}
                          >
                            <span className="block text-sm font-semibold">{BOOKING_SLOT_LABELS[slotOption]}</span>
                            <span className="mt-2 block text-xs font-medium uppercase tracking-[0.14em]">{SLOT_TIME_RANGES[slotOption]}</span>
                            <span className="mt-4 block text-sm leading-6">{slotState.stateLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-3 text-xs leading-6 text-emerald-900"><strong>Szabad</strong><br />azonnal választható</div>
                    <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-3 text-xs leading-6 text-amber-900"><strong>Függőben</strong><br />még jóváhagyásra vár</div>
                    <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-3 text-xs leading-6 text-rose-900"><strong>Foglalt</strong><br />már megerősített időpont</div>
                  </div>

                  {slotEditorError ? <p className="rounded-md border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-900">{slotEditorError}</p> : null}

                  <div className="flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={closeSlotEditor}
                      disabled={isSlotEditorSubmitting}
                      className="button-secondary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Mégse
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitSlotEditor}
                      disabled={isSlotEditorSubmitting}
                      className="button-primary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSlotEditorSubmitting
                        ? slotEditor.mode === "move" ? "Áthelyezés..." : "Hozzáadás..."
                        : slotEditor.mode === "move" ? "Időpont áthelyezése" : "Új időpont hozzáadása"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

