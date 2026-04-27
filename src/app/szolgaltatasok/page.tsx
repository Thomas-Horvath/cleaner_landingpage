import type { Metadata } from "next";

import { CtaBanner } from "@/components/marketing/cta-banner";
import { HeroLink, PageHero } from "@/components/marketing/page-hero";
import { ServiceCards } from "@/components/marketing/service-cards";
import { serviceGroups } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Szolgáltatások",
  description: "Otthoni, irodai és nagytakarítási szolgáltatások áttekintése.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Szolgáltatási oldalak"
        title="Külön menüpont alatt részletezzük, miben tud segíteni a takarítási szolgáltatás."
        description="Ez az oldal a referenciában látott hosszabb szolgáltatáslista modernebb megfelelője. Tiszta kártyák, rövid leírások és könnyen áttekinthető blokkok segítik a döntést."
        actions={
          <>
            <HeroLink href="/ajanlatkeres" label="Ajánlatot kérek" />
            <HeroLink href="/arak" label="Árak megtekintése" variant="secondary" />
          </>
        }
      />

      <ServiceCards
        eyebrow="Teljes lista"
        title="Első körben ezekre a szolgáltatástípusokra épül a weboldal."
        description="A későbbiekben minden kártya bővíthető saját aloldallal, részletesebb tartalommal vagy célzott CTA-val."
        items={serviceGroups}
      />

      <CtaBanner
        eyebrow="Következő lépés"
        title="A szolgáltatásoldalak után a szövegezés és az árkommunikáció finomítható."
        description="Ha megvannak a végleges szolgáltatások és területek, ezekhez külön SEO-orientált blokkokat is készíthetünk."
        primaryAction={{ href: "/kapcsolat", label: "Kapcsolat" }}
        secondaryAction={{ href: "/referenciak", label: "Referenciák" }}
      />
    </>
  );
}
