import type { Metadata } from "next";

import { CtaBanner } from "@/components/marketing/cta-banner";
import { ContactGrid } from "@/components/marketing/contact-grid";
import { HeroLink, PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Kapcsolat | Tisztaság Műhely",
  description: "Elérhetőségek és kapcsolatfelvételi lehetőségek takarítási szolgáltatáshoz Keszthelyen és környékén.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kapcsolat"
        title="Ha kérdésed van, vagy előbb egyeztetnél, itt könnyen elérsz."
        description="Telefonon és e-mailben is szívesen fogadom a megkereséseket. Akkor is írj nyugodtan, ha még csak körvonalazódik benned, milyen segítségre lenne szükséged Keszthelyen vagy a környéken."
        actions={
          <>
            <HeroLink href="/ajanlatkeres" label="Ajánlatkérés" />
            <HeroLink href="tel:+36301234567" label="Telefonhívás" variant="secondary" />
          </>
        }
      />

      <ContactGrid />

      <CtaBanner
        eyebrow="Gyors egyeztetés"
        title="Ha már nagyjából tudod, mire lenne szükséged, az ajánlatkérő oldalon rögtön el tudod indítani az egyeztetést."
        description="Válassz egy számodra megfelelő időpontot, írd meg röviden a részleteket, és visszajelzek a lehetőségekkel. Így gyorsabban össze tud állni, milyen takarítás lenne számodra a legjobb megoldás."
        primaryAction={{ href: "/ajanlatkeres", label: "Ajánlatkérés" }}
        secondaryAction={{ href: "/referenciak", label: "Referenciák" }}
      />
    </>
  );
}
