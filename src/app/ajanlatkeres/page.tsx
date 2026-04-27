import type { Metadata } from "next";

import { BookingWidgetPlaceholder } from "@/components/marketing/booking-widget-placeholder";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { HeroLink, PageHero } from "@/components/marketing/page-hero";
import { InquiryLayout } from "@/components/marketing/inquiry-layout";

export const metadata: Metadata = {
  title: "Ajánlatkérés",
  description: "Ajánlatkérő és online foglalási előkészítő oldal.",
};

export default function InquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Ajánlatkérő oldal"
        title="Ez az oldal készíti elő a későbbi online foglalási vagy külső űrlapos működést."
        description="Statikus hoszting miatt saját backendet nem építünk rá, de a navigáció, a CTA-k és a tartalmi felépítés már most a konverzió irányába visz."
        actions={
          <>
            <HeroLink href="https://simplybook.me" label="SimplyBook.me megnyitása" />
            <HeroLink href="/kapcsolat" label="Kapcsolat" variant="secondary" />
          </>
        }
      />

      <InquiryLayout />
      <BookingWidgetPlaceholder />

      <CtaBanner
        eyebrow="Következő integráció"
        title="A következő fejlesztési körben ide kerülhet a beágyazott foglalási rendszer."
        description="A widgetes beágyazás külön dokumentálva is lett, így a következő fejlesztési körben már a valós SimplyBook.me kódot tudjuk ide bekötni."
        primaryAction={{ href: "/szolgaltatasok", label: "Szolgáltatások áttekintése" }}
        secondaryAction={{ href: "/", label: "Vissza a főoldalra" }}
      />
    </>
  );
}
