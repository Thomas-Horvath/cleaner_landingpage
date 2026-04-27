import type { Metadata } from "next";

import { CtaBanner } from "@/components/marketing/cta-banner";
import { ContactGrid } from "@/components/marketing/contact-grid";
import { HeroLink, PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Kapcsolat",
  description: "Kapcsolati oldal takarítási vállalkozáshoz.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kapcsolat és egyeztetés"
        title="Az elérhetőségek külön oldalra kerültek, hogy mobilon is gyorsan használhatók legyenek."
        description="Itt tudjuk majd elhelyezni a végleges telefonszámokat, e-mail címet, szolgáltatási területet, Google Térkép hivatkozást és a külső űrlapokat is."
        actions={
          <>
            <HeroLink href="/ajanlatkeres" label="Ajánlatkérés" />
            <HeroLink href="tel:+36301234567" label="Telefonhívás" variant="secondary" />
          </>
        }
      />

      <ContactGrid />

      <CtaBanner
        eyebrow="Foglalási irány"
        title="A kapcsolat oldalról is könnyen átvihető a felhasználó az online foglalás felé."
        description="Ha a későbbiekben a SimplyBook.me lesz a fő csatorna, ide is kerülhet külön kiemelt gomb vagy widget-blokk."
        primaryAction={{ href: "/ajanlatkeres", label: "Foglalási irányok" }}
        secondaryAction={{ href: "/referenciak", label: "Referenciák" }}
      />
    </>
  );
}
