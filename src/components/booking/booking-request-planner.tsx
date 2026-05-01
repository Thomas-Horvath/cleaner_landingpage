"use client";

import { useEffect, useMemo, useState } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarDays,
  FaCircleCheck,
  FaClock,
  FaHourglassHalf,
} from 'react-icons/fa6';

import { Container } from '@/components/layout/container';
import { SectionIntro } from '@/components/marketing/section-intro';
import {
  BOOKING_SLOT_LABELS,
  createPendingBooking,
  fetchWeekBookingSlots,
  type BookingApiSource,
} from '@/lib/booking-api';
import type { BookingFormPayload, BookingSlotLabel, BookingSlotState, BookingStatus } from '@/types/site';

const SLOT_ORDER: BookingSlotLabel[] = ['morning', 'afternoon', 'evening'];

const BOOKING_SLOT_TIME_RANGES: Record<BookingSlotLabel, string> = {
  morning: '8:00-11:00',
  afternoon: '12:00-15:00',
  evening: '16:00-19:00',
};

const STATUS_STYLES: Record<BookingStatus, string> = {
  free: 'border border-emerald-500/25 bg-emerald-50 text-emerald-900',
  pending: 'border border-amber-500/30 bg-amber-50 text-amber-900',
  confirmed: 'border border-rose-500/25 bg-rose-50 text-rose-900',
};

const STATUS_LABELS: Record<BookingStatus, string> = {
  free: 'Szabad',
  pending: 'Függőben',
  confirmed: 'Foglalt',
};

const UNAVAILABLE_SLOT_STYLE = 'border border-slate-300 bg-slate-100 text-slate-500';
const MIN_FORM_FILL_TIME_MS = 3000;

const INITIAL_FORM_STATE: BookingFormPayload = {
  customer_name: '',
  email: '',
  phone: '',
  address: '',
  service_type: 'Lakástakarítás',
  message: '',
  booking_date: '',
  slot: 'morning',
  website: '',
};

function getStartOfWeek(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addDays(date: Date, amount: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function toIsoDate(date: Date): string {
  return date.toLocaleDateString('en-CA');
}

function getTodayStart(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function isDateBookable(date: Date): boolean {
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  return compareDate.getTime() > getTodayStart().getTime();
}

function isIsoDateBookable(isoDate: string): boolean {
  return isDateBookable(new Date(`${isoDate}T00:00:00`));
}

function formatDisplayDate(date: Date): string {
  return new Intl.DateTimeFormat('hu-HU', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date);
}

function getStatusIcon(status: BookingStatus) {
  if (status === 'confirmed') {
    return <FaCircleCheck className="h-4 w-4" />;
  }

  if (status === 'pending') {
    return <FaHourglassHalf className="h-4 w-4" />;
  }

  return <FaClock className="h-4 w-4" />;
}

export function BookingRequestPlanner() {
  // Az egész foglalási UI központi állapota innen indul.
  // Itt tároljuk:
  // - melyik hét látszik
  // - milyen slot adatokat töltöttünk le a backendből
  // - melyik idősáv van kijelölve
  // - mi van a form mezőiben
  // - mikor kezdte el kitölteni a felhasználó az űrlapot
  const [weekOffset, setWeekOffset] = useState(0);
  const [slotStates, setSlotStates] = useState<BookingSlotState[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlotState | null>(null);
  const [formState, setFormState] = useState<BookingFormPayload>(INITIAL_FORM_STATE);
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [apiSource, setApiSource] = useState<BookingApiSource>('api');

  const currentWeekStart = useMemo(() => getStartOfWeek(new Date()), []);

  const weekStart = useMemo(() => {
    return addDays(currentWeekStart, weekOffset * 7);
  }, [currentWeekStart, weekOffset]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  }, [weekStart]);

  const weekRangeLabel = useMemo(() => {
    const weekEnd = weekDays[6];
    return `${formatLongDate(weekDays[0])} - ${formatLongDate(weekEnd)}`;
  }, [weekDays]);

  useEffect(() => {
    let isMounted = true;

    async function loadWeekSlots() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const dateFrom = toIsoDate(weekDays[0]);
        const dateTo = toIsoDate(weekDays[6]);
        const bookingResult = await fetchWeekBookingSlots(dateFrom, dateTo);

        if (!isMounted) {
          return;
        }

        setSlotStates(bookingResult.slots);
        setApiSource(bookingResult.source);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : 'Ismeretlen hiba történt a naptár betöltésekor.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadWeekSlots();

    return () => {
      isMounted = false;
    };
  }, [weekDays]);

  function getSlotState(date: Date, slot: BookingSlotLabel): BookingSlotState {
    const bookingDate = toIsoDate(date);

    const existingSlot = slotStates.find(
      (slotState) => slotState.bookingDate === bookingDate && slotState.slot === slot
    );

    if (existingSlot) {
      return existingSlot;
    }

    return {
      bookingDate,
      slot,
      status: 'free',
    };
  }

  function handleWeekChange(direction: 'previous' | 'next') {
    if (direction === 'previous' && weekOffset === 0) {
      return;
    }

    setSelectedSlot(null);
    setSuccessMessage(null);
    setErrorMessage(null);

    setWeekOffset((currentWeekOffset) => currentWeekOffset + (direction === 'next' ? 1 : -1));
  }

  function handleSelectSlot(slotState: BookingSlotState) {
    if (slotState.status !== 'free' || !isIsoDateBookable(slotState.bookingDate)) {
      return;
    }

    setSelectedSlot(slotState);
    setSuccessMessage(null);
    setErrorMessage(null);

    setFormState((currentState) => ({
      ...currentState,
      booking_date: slotState.bookingDate,
      slot: slotState.slot,
    }));
  }

  function handleInputChange(field: keyof BookingFormPayload, value: string) {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedSlot) {
      setErrorMessage('Először válassz egy szabad időpontot a naptárban.');
      return;
    }

    if (!isIsoDateBookable(selectedSlot.bookingDate)) {
      setErrorMessage('Csak jövőbeli, azaz holnaptól kezdődő időpontra lehet foglalást küldeni.');
      return;
    }

    if (Date.now() - formStartedAt < MIN_FORM_FILL_TIME_MS) {
      setErrorMessage('Kérlek várj egy pillanatot, majd küldd el újra az ajánlatkérést.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const submitResult = await createPendingBooking({
        ...formState,
        booking_date: selectedSlot.bookingDate,
        slot: selectedSlot.slot,
        website: formState.website ?? '',
        form_started_at: formStartedAt,
      });

      setSuccessMessage(
        submitResult.source === 'api'
          ? 'Köszönöm, az ajánlatkérésedet rögzítettem. Hamarosan visszajelzek a részletekkel.'
          : 'A bemutató felületen most nincs élő backend kapcsolat, ezért a kérésedet nem mentettem adatbázisba, de a folyamat így is kipróbálható.'
      );
      setSelectedSlot(null);
      setFormState(INITIAL_FORM_STATE);
      setFormStartedAt(Date.now());

      const refreshedSlots = await fetchWeekBookingSlots(toIsoDate(weekDays[0]), toIsoDate(weekDays[6]));
      setSlotStates(refreshedSlots.slots);
      setApiSource(refreshedSlots.source);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Nem sikerült elküldeni a foglalást.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section-space section-soft pt-0">
      <Container>
        <SectionIntro
          eyebrow="Időpontválasztás"
          title="Válassz egy neked megfelelő hetet, és nézd meg, melyik idősáv szabad."
          description="A zöld mezők jelenleg foglalhatók, a sárga idősávok már érdeklődés alatt vannak, a piros időpontok pedig beteltek. Ha kiválasztasz egy zöld sávot, alatta rögtön el tudod küldeni az ajánlatkérésedet."
        />

        <div className="panel mt-6 p-5 sm:p-6">
          <div className="flex flex-col gap-3 text-sm text-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
            <p className="font-semibold text-slate-900">Idősávok jelentése:</p>
            <p><strong>Délelőtt</strong>: {BOOKING_SLOT_TIME_RANGES.morning}</p>
            <p><strong>Délután</strong>: {BOOKING_SLOT_TIME_RANGES.afternoon}</p>
            <p><strong>Este</strong>: {BOOKING_SLOT_TIME_RANGES.evening}</p>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">
            Foglalást csak jövőbeli napra lehet küldeni, ezért az aznapi és korábbi dátumok nem választhatók.
          </p>

          {apiSource === 'fallback' ? (
            <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              A foglalási naptár jelenleg bemutató módban fut, mert nincs élő backend kapcsolat. A felület használható marad, de a küldések ilyenkor nem kerülnek adatbázisba.
            </p>
          ) : null}
        </div>

        <div className="mt-10 space-y-5">
          <div className="panel p-5 sm:p-6">
            <div className="flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Aktuális hét</p>
                <h3 className="headline mt-3 text-2xl sm:text-3xl">{weekRangeLabel}</h3>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleWeekChange('previous')}
                  disabled={weekOffset === 0}
                  className="button-secondary inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaArrowLeft className="h-4 w-4" />
                  Előző hét
                </button>
                <button
                  type="button"
                  onClick={() => handleWeekChange('next')}
                  className="button-secondary inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold"
                >
                  Következő hét
                  <FaArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-5 grid items-start gap-4 md:grid-cols-2 xl:grid-cols-7 xl:gap-3.5">
              {weekDays.map((day) => {
                const dateKey = toIsoDate(day);
                const isBookableDay = isDateBookable(day);

                return (
                  <article key={dateKey} className="min-w-0 rounded-md border border-border/70 bg-white/60 p-4 xl:min-h-[430px] xl:p-3.5">
                    <div className="border-b border-border/60 pb-3 xl:pb-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted xl:text-[0.68rem] xl:tracking-[0.14em]">
                        {new Intl.DateTimeFormat('hu-HU', { weekday: 'short' }).format(day)}
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-slate-900 xl:mt-2 xl:text-[1rem]">{formatDisplayDate(day)}</h4>
                    </div>

                    <div className="mt-4 grid gap-3 xl:mt-4 xl:gap-3">
                      {SLOT_ORDER.map((slot) => {
                        const slotState = getSlotState(day, slot);
                        const isSelectable = slotState.status === 'free' && isBookableDay;
                        const isSelected =
                          selectedSlot?.bookingDate === slotState.bookingDate &&
                          selectedSlot?.slot === slotState.slot;
                        const visualStatusLabel = isBookableDay ? STATUS_LABELS[slotState.status] : 'Nem foglalható';

                        return (
                          <button
                            key={`${dateKey}-${slot}`}
                            type="button"
                            onClick={() => handleSelectSlot(slotState)}
                            disabled={!isSelectable}
                            className={`grid min-w-0 min-h-[110px] w-full content-start gap-3 rounded-md p-3 text-left xl:min-h-[118px] xl:gap-3.5 xl:p-3 ${
                              isBookableDay ? STATUS_STYLES[slotState.status] : UNAVAILABLE_SLOT_STYLE
                            } ${isSelectable ? 'cursor-pointer hover:-translate-y-0.5' : 'cursor-not-allowed opacity-95'} ${isSelected ? 'ring-2 ring-secondary' : ''}`}
                          >
                            <div className="grid min-w-0 grid-cols-[1fr_auto] items-start gap-3">
                              <div className="min-w-0">
                                <p className="text-sm font-semibold leading-snug xl:text-[0.85rem]">{BOOKING_SLOT_LABELS[slot]}</p>
                                <p className="mt-1 text-[0.72rem] font-medium leading-4 opacity-70 xl:text-[0.68rem]">{BOOKING_SLOT_TIME_RANGES[slot]}</p>
                                <p className="mt-1 text-xs font-medium leading-4 opacity-80 xl:mt-1 xl:text-[0.72rem]">{visualStatusLabel}</p>
                              </div>
                              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-black/6">
                                {isBookableDay ? getStatusIcon(slotState.status) : <FaClock className="h-4 w-4" />}
                              </span>
                            </div>

                            {slotState.customerName ? (
                              <p className="break-words text-xs leading-5 opacity-85 xl:text-[0.7rem] xl:leading-4">{slotState.customerName}</p>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>

            {isLoading ? (
              <p className="mt-5 text-sm text-muted">A heti foglalások betöltése folyamatban...</p>
            ) : null}

            {errorMessage ? (
              <p className="mt-5 rounded-md border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-900">{errorMessage}</p>
            ) : null}
          </div>

          <div className="panel p-5 sm:p-6 xl:p-7">
            <div className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-10">
              <aside className="space-y-4">
                <div className="rounded-md border border-border/70 bg-white/65 p-5">
                  <div className="flex items-center gap-3">
                    <div className="icon-badge p-3">
                      <FaCalendarDays className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Kijelölt időpont</p>
                      <h3 className="mt-1 text-xl font-semibold text-slate-900">
                        {selectedSlot ? 'Kiválasztott időpont' : 'Válassz időpontot'}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-5 rounded-md border border-border/60 bg-surface px-4 py-4 text-sm leading-7 text-foreground">
                    {selectedSlot ? (
                      <>
                        <p><strong>Dátum:</strong> {selectedSlot.bookingDate}</p>
                        <p><strong>Idősáv:</strong> {BOOKING_SLOT_LABELS[selectedSlot.slot]} ({BOOKING_SLOT_TIME_RANGES[selectedSlot.slot]})</p>
                        <p><strong>Állapot:</strong> {STATUS_LABELS[selectedSlot.status]}</p>
                      </>
                    ) : (
                      <p>Még nincs kijelölt időpont. Válassz egy szabad, zöld idősávot, majd add meg az elérhetőségeidet az űrlapon.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-md border border-border/70 bg-white/50 p-5 text-sm leading-7 text-muted">
                  <p className="font-semibold text-slate-900">Mi történik beküldés után?</p>
                  <p className="mt-2">
                    A kérésed először függőben állapotba kerül. Ezután visszajelzek, pontosítjuk a részleteket, és megerősítem az időpontot.
                  </p>
                </div>
              </aside>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">Ajánlatkérés elküldése</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                    Add meg az alapadataidat, és írd meg röviden, milyen takarításra lenne szükséged. Minél pontosabb az első üzenet, annál könnyebben tudok gyors visszajelzést adni.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium text-foreground">
                    Név
                    <input
                      value={formState.customer_name}
                      onChange={(event) => handleInputChange('customer_name', event.target.value)}
                      className="rounded-md border border-border/70 bg-white px-4 py-3 text-sm"
                      placeholder="Pl. Kiss Anna"
                      required
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-foreground">
                    E-mail
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(event) => handleInputChange('email', event.target.value)}
                      className="rounded-md border border-border/70 bg-white px-4 py-3 text-sm"
                      placeholder="anna@example.com"
                      required
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-foreground">
                    Telefonszám
                    <input
                      value={formState.phone}
                      onChange={(event) => handleInputChange('phone', event.target.value)}
                      className="rounded-md border border-border/70 bg-white px-4 py-3 text-sm"
                      placeholder="+36 30 123 4567"
                      required
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-foreground">
                    Cím
                    <input
                      value={formState.address}
                      onChange={(event) => handleInputChange('address', event.target.value)}
                      className="rounded-md border border-border/70 bg-white px-4 py-3 text-sm"
                      placeholder="8360 Keszthely, Minta utca 12."
                      required
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-foreground">
                    Szolgáltatás típusa
                    <select
                      value={formState.service_type}
                      onChange={(event) => handleInputChange('service_type', event.target.value)}
                      className="rounded-md border border-border/70 bg-white px-4 py-3 text-sm"
                    >
                      <option>Lakástakarítás</option>
                      <option>Nagytakarítás</option>
                      <option>Irodatakarítás</option>
                      <option>Ablaktisztítás</option>
                    </select>
                  </label>

                  <div className="hidden md:block" />

                  <label className="grid gap-2 text-sm font-medium text-foreground md:col-span-2">
                    Üzenet
                    <textarea
                      value={formState.message}
                      onChange={(event) => handleInputChange('message', event.target.value)}
                      className="min-h-[140px] rounded-md border border-border/70 bg-white px-4 py-3 text-sm"
                      placeholder="Írd le röviden a takarítás típusát, a lakás méretét vagy bármi fontos infót."
                    />
                  </label>

                  <label className="hidden" aria-hidden="true">
                    Weboldal
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={formState.website ?? ''}
                      onChange={(event) => handleInputChange('website', event.target.value)}
                    />
                  </label>
                </div>

                {successMessage ? (
                  <p className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                    {successMessage}
                  </p>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted">
                    A beküldés előtt kérlek ellenőrizd, hogy kiválasztottál-e időpontot a naptárban.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedSlot}
                    className="button-primary inline-flex w-full items-center justify-center px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[260px]"
                  >
                    {isSubmitting ? 'Küldés folyamatban...' : 'Ajánlatkérés elküldése'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
