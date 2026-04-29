"use client";

import { useSyncExternalStore } from 'react';

import { BookingRequestPlanner } from '@/components/booking/booking-request-planner';

const emptySubscribe = () => () => undefined;

function useClientReady() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function BookingWidgetPlaceholder() {
  // A teljes foglalási planner böngészős állapotra és aktuális dátumra épül.
  // Statikus exportnál is működik, ha a szerver csak egy üres helyet renderel,
  // és a valódi interaktív naptár csak a kliens oldalon jelenik meg.
  const isClientReady = useClientReady();

  if (!isClientReady) {
    return null;
  }

  return <BookingRequestPlanner />;
}
