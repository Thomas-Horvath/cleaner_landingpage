import type { Metadata } from "next";

import { CtaBanner } from "@/components/marketing/cta-banner";
import { HeroLink, PageHero } from "@/components/marketing/page-hero";
import { PriceCards } from "@/components/marketing/price-cards";
import { priceItems } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Árak | Tisztaság Műhely",
  description: "Ajánlatkérés alapú árképzés lakásokhoz, kisebb irodákhoz és nagytakarítási munkákhoz Keszthelyen és környékén.",
};

export default function PricesPage() {
  return (
    <>
      <PageHero
        eyebrow="Árak"
        title="A pontos ár mindig az otthon, a feladat és a kívánt rendszeresség alapján alakul."
        description="Minden takarítás más, ezért az ár is attól függ, mekkora területről van szó, milyen állapotban van a helyszín, és milyen részletességű munkára lenne szükség."
        actions={
          <>
            <HeroLink href="/ajanlatkeres" label="Árajánlatot kérek" />
            <HeroLink href="/szolgaltatasok" label="Szolgáltatások" variant="secondary" />
          </>
        }
      />

      <PriceCards items={priceItems} />

      <CtaBanner
        eyebrow="Személyre szabott ajánlat"
        title="A legpontosabb ajánlat akkor születik meg, ha röviden látom, mire lenne szükséged."
        description="Írd meg, mekkora területről van szó, milyen gyakran lenne szükség takarításra, és van-e valamilyen külön kérésed. Ez alapján gyorsabban és pontosabban tudok visszajelezni."
        primaryAction={{ href: "/ajanlatkeres", label: "Ajánlatkérés" }}
        secondaryAction={{ href: "/kapcsolat", label: "Telefonos egyeztetés" }}
      />
    </>
  );
}
