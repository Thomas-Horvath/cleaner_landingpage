import type { Metadata } from 'next';

import { BookingWidgetPlaceholder } from '@/components/marketing/booking-widget-placeholder';
import { CtaBanner } from '@/components/marketing/cta-banner';
import { HeroLink, PageHero } from '@/components/marketing/page-hero';
import { InquiryLayout } from '@/components/marketing/inquiry-layout';

export const metadata: Metadata = {
  title: 'Ajánlatkérés',
  description: 'Kérj ajánlatot lakástakarításhoz, nagytakarításhoz vagy rendszeres segítséghez.',
};

export default function InquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Ajánlatkérés"
        title="Mondd el, milyen segítségre van szükséged, és válassz egy szimpatikus időpontot."
        description="Legyen szó heti lakástakarításról, nagytakarításról vagy alkalmi segítségről, ezen az oldalon gyorsan el tudod küldeni az igényedet. Válassz egy szabad idősávot, töltsd ki az adatokat, és hamarosan visszajelzek neked."
        actions={
          <>
            <HeroLink href="#foglalasi-naptar" label="Időpontot választok" />
            <HeroLink href="/kapcsolat" label="Inkább felhívnálak" variant="secondary" />
          </>
        }
      />

      <InquiryLayout />

      <div id="foglalasi-naptar">
        <BookingWidgetPlaceholder />
      </div>

      <CtaBanner
        eyebrow="Nem találtál megfelelő időpontot?"
        title="Írj akkor is, ha még bizonytalan vagy a pontos nappal vagy a takarítás típusával."
        description="Ha előbb egyeztetnél telefonon vagy e-mailben, a kapcsolat oldalon keresztül is könnyen elérsz. Segítek kitalálni, mekkora időkeret és milyen szolgáltatás passzol legjobban az otthonodhoz."
        primaryAction={{ href: '/kapcsolat', label: 'Kapcsolatfelvétel' }}
        secondaryAction={{ href: '/szolgaltatasok', label: 'Szolgáltatások' }}
      />
    </>
  );
}
