import type { Metadata } from "next";

import { CtaBanner } from "@/components/marketing/cta-banner";
import { HeroLink, PageHero } from "@/components/marketing/page-hero";
import { ServiceCards } from "@/components/marketing/service-cards";
import { serviceGroups } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Szolgáltatások | Tisztaság Műhely",
  description: "Lakástakarítás, kisebb irodák takarítása, nagytakarítás és kiegészítő szolgáltatások Keszthelyen és környékén.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Szolgáltatások"
        title="Minden otthon, minden iroda és minden élethelyzet más, ezért a takarítás is ehhez igazodik."
        description="Akár rendszeres segítséget keresel, akár egy egyszeri, alapos rendbetételre lenne szükséged, itt átnézheted, milyen munkákban tudok segíteni Keszthelyen és a környéken."
        actions={
          <>
            <HeroLink href="/ajanlatkeres" label="Ajánlatot kérek" />
            <HeroLink href="/arak" label="Árak megtekintése" variant="secondary" />
          </>
        }
      />

      <ServiceCards
        eyebrow="Szolgáltatások"
        title="A leggyakoribb takarítási igények egy helyen"
        description="A pontos feladatok és az időráfordítás mindig attól függnek, milyen állapotban van a helyszín, és te milyen segítséget szeretnél kérni."
        items={serviceGroups}
      />

      <CtaBanner
        eyebrow="Segítek eligazodni"
        title="Ha még nem tudod pontosan, melyik szolgáltatás lenne számodra a legjobb, egy rövid egyeztetéssel ezt is ki tudjuk találni."
        description="Elég, ha röviden leírod, milyen térben lenne szükség takarításra, milyen gyakran gondolkodsz benne, és mi az, ami most a legfontosabb számodra. Innen már könnyű továbbmenni."
        primaryAction={{ href: "/kapcsolat", label: "Kapcsolat" }}
        secondaryAction={{ href: "/ajanlatkeres", label: "Ajánlatkérés" }}
      />
    </>
  );
}
