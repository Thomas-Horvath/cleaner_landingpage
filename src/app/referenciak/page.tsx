import type { Metadata } from "next";

import { CtaBanner } from "@/components/marketing/cta-banner";
import { HeroLink, PageHero } from "@/components/marketing/page-hero";
import { ReferenceGallery } from "@/components/marketing/reference-gallery";
import { referenceItems } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Referenciák | Tisztaság Műhely",
  description: "Otthoni és kisebb irodai takarítások hangulatát bemutató referenciaoldal Keszthelyen és környékén.",
};

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Referenciák"
        title="A rendezett, tiszta terek hangulata sokszor önmagáért beszél."
        description="Ezen az oldalon olyan enteriőröket és részleteket látsz, amelyek jól visszaadják, milyen igényes, friss és ápolt összhatásra számíthatsz egy alapos takarítás után."
        actions={
          <>
            <HeroLink href="/ajanlatkeres" label="Hasonló munkára kérek ajánlatot" />
            <HeroLink href="/kapcsolat" label="Kapcsolat" variant="secondary" />
          </>
        }
      />

      <ReferenceGallery items={referenceItems} />

      <CtaBanner
        eyebrow="Saját igények"
        title="Ha hasonló jellegű segítségre lenne szükséged, az egyeztetést pár perc alatt el tudjuk indítani."
        description="Írd meg röviden, milyen takarításra gondoltál, és visszajelzek a lehetőségekkel. Legyen szó rendszeres segítségről vagy egy alaposabb egyszeri munkáról, együtt megtaláljuk a megfelelő megoldást."
        primaryAction={{ href: "/ajanlatkeres", label: "Ajánlatot kérek" }}
        secondaryAction={{ href: "/szolgaltatasok", label: "Szolgáltatások" }}
      />
    </>
  );
}
