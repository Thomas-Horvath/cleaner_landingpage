import type { Metadata } from "next";

import { CtaBanner } from "@/components/marketing/cta-banner";
import { HeroLink, PageHero } from "@/components/marketing/page-hero";
import { PriceCards } from "@/components/marketing/price-cards";
import { priceItems } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Árak",
  description: "Árképzési logika és ajánlat alapú kommunikáció takarítási szolgáltatásokhoz.",
};

export default function PricesPage() {
  return (
    <>
      <PageHero
        eyebrow="Árak és csomagok"
        title="Az ár oldal célja most nem a fix listaár, hanem a korrekt ajánlatkérés támogatása."
        description="A takarítási projektek nagy része helyszíntől, állapottól és gyakoriságtól függ. Ezért a dizájn azt hangsúlyozza, hogy az ajánlat személyre szabott, mégis átlátható."
        actions={
          <>
            <HeroLink href="/ajanlatkeres" label="Árajánlatot kérek" />
            <HeroLink href="/szolgaltatasok" label="Szolgáltatások" variant="secondary" />
          </>
        }
      />

      <PriceCards items={priceItems} />

      <CtaBanner
        eyebrow="Ajánlatkérés"
        title="Az árak oldalról közvetlenül átvezetjük a látogatót a konverziós pontra."
        description="Később itt lehet majd kalkulátort, gyakori kérdéseket vagy terület szerinti árblokkot is elhelyezni, ha erre szükség lesz."
        primaryAction={{ href: "/ajanlatkeres", label: "Ajánlatkérő oldal" }}
        secondaryAction={{ href: "/kapcsolat", label: "Telefonos egyeztetés" }}
      />
    </>
  );
}
