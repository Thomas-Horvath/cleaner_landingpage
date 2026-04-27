import type { Metadata } from "next";

import { CtaBanner } from "@/components/marketing/cta-banner";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { HeroSplit } from "@/components/marketing/hero-split";
import { ImageShowcase } from "@/components/marketing/image-showcase";
import { ServiceCards } from "@/components/marketing/service-cards";
import { StatsStrip } from "@/components/marketing/stats-strip";
import { homeHighlights, homeStats, serviceGroups } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Tisztaság Műhely | Takarítás otthonokra és irodákra",
  description:
    "Többoldalas takarítási weboldal modern megjelenéssel, online foglalási lehetőségre előkészítve.",
};

export default function HomePage() {
  return (
    <>
      <HeroSplit
        eyebrow="Precíz takarítás Budapesten és környékén"
        title="Nagytakarítás hangulatú, de modernebb és bizalomépítőbb kezdőoldal."
        description="Az új főoldal már nem egy egyszerű landing: szolgáltatás-előnézetekkel, referenciaképekkel, árblokkra vezető CTA-kkal és külön ajánlatkérési útvonallal dolgozik."
        primaryAction={{ href: "/ajanlatkeres", label: "Ajánlatot kérek" }}
        secondaryAction={{ href: "/szolgaltatasok", label: "Szolgáltatások" }}
        imageSrc="/images/hero-cleaning.jpg"
        imageAlt="Irodai felület takarítása sárga kesztyűben"
      />

      <StatsStrip items={homeStats} />

      <ServiceCards
        eyebrow="Miben segítünk?"
        title="Otthoni, irodai és eseti takarítás külön oldalakon is kibontva."
        description="A kezdőlapon most a legfontosabb szolgáltatási csoportokat emeljük ki, a részletek pedig külön menüpont alá kerültek."
        items={serviceGroups.slice(0, 3)}
      />

      <FeatureGrid
        eyebrow="Miért működik ez a struktúra?"
        title="A referenciákból ismert blokkos felépítést áthoztuk, de letisztultabb vizuális iránnyal."
        description="A nagytakaritas.com tartalmi logikája jól használható, ezért megtartottuk a szolgáltatás, referencia, ár és kapcsolat tengelyt. A megjelenés viszont világosabb, modernebb és szellősebb lett."
        items={homeHighlights}
      />

      <ImageShowcase />

      <CtaBanner
        eyebrow="Online foglalás"
        title="A SimplyBook.me integráció külön oldalas struktúrában is kényelmesen elhelyezhető."
        description="Az ajánlatkérés és a foglalás külön céloldalt kapott, így később egyszerű lesz külső rendszerre irányítani a látogatót vagy beágyazott widgetet használni."
        primaryAction={{ href: "/ajanlatkeres", label: "Foglalási oldal előkészítése" }}
        secondaryAction={{ href: "/kapcsolat", label: "Kapcsolat" }}
      />
    </>
  );
}
