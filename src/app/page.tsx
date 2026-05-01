import type { Metadata } from "next";

import { CtaBanner } from "@/components/marketing/cta-banner";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { HeroSplit } from "@/components/marketing/hero-split";
import { ImageShowcase } from "@/components/marketing/image-showcase";
import { ServiceCards } from "@/components/marketing/service-cards";
import { StatsStrip } from "@/components/marketing/stats-strip";
import { homeHighlights, homeStats, serviceGroups } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Tisztaság Műhely | Takarítás Keszthelyen és környékén",
  description:
    "Lakástakarítás, nagytakarítás és kisebb irodák takarítása Keszthelyen és a környező településeken, rugalmas egyeztetéssel.",
};

export default function HomePage() {
  return (
    <>
      <HeroSplit
        eyebrow="Takarítás Keszthelyen és környékén"
        title="Segítség, ha jó érzés lenne mindig tiszta, rendezett otthonba vagy munkatérbe hazaérni."
        description="Rendszeres lakástakarítást, alkalmi nagytakarítást és kisebb irodák tisztán tartását vállalom Keszthelyen és a környező településeken. A cél egyszerű: levegyem a válladról a takarítás terhét, hogy neked több időd maradjon arra, ami igazán fontos."
        primaryAction={{ href: "/ajanlatkeres", label: "Ajánlatot kérek" }}
        secondaryAction={{ href: "/szolgaltatasok", label: "Szolgáltatások" }}
        imageSrc="/images/hero-cleaning.jpg"
        imageAlt="Irodai felület takarítása sárga kesztyűben"
      />

      <StatsStrip items={homeStats} />

      <ServiceCards
        eyebrow="Miben tudok segíteni?"
        title="Akár rendszeres segítséget keresel, akár egy alapos egyszeri takarításra lenne szükséged, megtaláljuk a neked való megoldást."
        description="Összegyűjtöttem a leggyakoribb szolgáltatásokat, hogy első pillantásra is lásd, milyen típusú munkákban tudsz rám számítani."
        items={serviceGroups.slice(0, 3)}
      />

      <FeatureGrid
        eyebrow="Miért szeretnek velem dolgozni?"
        title="A jó takarítás nemcsak a végeredményről szól, hanem arról is, hogy az egész folyamat nyugodt és kiszámítható legyen."
        description="Fontosnak tartom a pontos egyeztetést, a megbízható jelenlétet és azt, hogy már az első beszélgetésnél tudd, mire számíthatsz."
        items={homeHighlights}
      />

      <ImageShowcase />

      <CtaBanner
        eyebrow="Időpont-egyeztetés"
        title="Ha megvan, mire lenne szükséged, küldd el pár perc alatt az igényedet."
        description="Az ajánlatkérő oldalon kiválaszthatsz egy megfelelő időpontot, leírhatod röviden a feladatot, én pedig visszajelzek a részletekkel."
        primaryAction={{ href: "/ajanlatkeres", label: "Ajánlatkérés" }}
        secondaryAction={{ href: "/kapcsolat", label: "Kapcsolat" }}
      />
    </>
  );
}
