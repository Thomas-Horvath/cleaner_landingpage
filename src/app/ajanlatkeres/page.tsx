import type { Metadata } from "next";

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

      <CtaBanner
        eyebrow="Következő integráció"
        title="A következő fejlesztési körben ide kerülhet a beágyazott foglalási rendszer."
        description="Ha szeretnéd, a következő lépésben már a konkrét oldalak végleges szövegezését és a SimplyBook.me integrációs helyét is kidolgozom."
        primaryAction={{ href: "/szolgaltatasok", label: "Szolgáltatások áttekintése" }}
        secondaryAction={{ href: "/", label: "Vissza a főoldalra" }}
      />
    </>
  );
}
