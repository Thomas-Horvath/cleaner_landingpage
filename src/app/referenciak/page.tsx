import type { Metadata } from "next";

import { CtaBanner } from "@/components/marketing/cta-banner";
import { HeroLink, PageHero } from "@/components/marketing/page-hero";
import { ReferenceGallery } from "@/components/marketing/reference-gallery";
import { referenceItems } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Referenciák",
  description: "Képes referenciaoldal takarítási szolgáltatáshoz.",
};

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Referenciák és vizuális bizalom"
        title="A referenciák külön oldalon sokkal erősebbek, mint egy rövid főoldali galériában."
        description="A konkurens oldalak logikáját megtartottuk, de rendezettebb, magazinosabb tálalással. Később ide jöhetnek saját munkafotók, ügyfélidézetek és előtte-utána összeállítások is."
        actions={
          <>
            <HeroLink href="/ajanlatkeres" label="Hasonló munkára kérek ajánlatot" />
            <HeroLink href="/kapcsolat" label="Kapcsolat" variant="secondary" />
          </>
        }
      />

      <ReferenceGallery items={referenceItems} />

      <CtaBanner
        eyebrow="Saját fotók"
        title="A következő körben a stock képek helyére könnyen betehetők a valódi referenciaanyagok."
        description="A mostani felépítés azért előnyös, mert a képblokkok és a kísérő szövegek már készen állnak a valós tartalom fogadására."
        primaryAction={{ href: "/ajanlatkeres", label: "Ajánlatot kérek" }}
        secondaryAction={{ href: "/szolgaltatasok", label: "Szolgáltatások" }}
      />
    </>
  );
}
