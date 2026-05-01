import { FaCalendarDays, FaFileSignature, FaPhoneVolume } from "react-icons/fa6";

import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/marketing/section-intro";

const steps = [
  {
    title: "1. Válassz szolgáltatást",
    description:
      "Jelöld meg, hogy rendszeres lakástakarításról, egyszeri nagytakarításról vagy egy kisebb, célzott feladatról van szó.",
    icon: FaFileSignature,
  },
  {
    title: "2. Add meg az elérhetőségeidet",
    description:
      "Írd meg, hol lenne szükség a takarításra, és melyik telefonszámon vagy e-mail címen tudlak a legkönnyebben elérni.",
    icon: FaPhoneVolume,
  },
  {
    title: "3. Küldd el az igényed",
    description:
      "A kiválasztott időponttal együtt megérkezik az ajánlatkérésed, én pedig visszajelzek a részletekről és a megerősítésről.",
    icon: FaCalendarDays,
  },
];

export function InquiryLayout() {
  return (
    <section className="section-space section-warm pt-0">
      <Container>
        <SectionIntro
          eyebrow="Hogyan működik?"
          title="Néhány egyszerű lépésben el tudod küldeni, mire lenne szükséged."
          description="Az ajánlatkérés célja, hogy már az első üzenetben lássam az alap igényeidet, így gyorsabban és pontosabban tudok visszajelezni neked."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="surface-dark p-5 sm:p-7 lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
              Átlátható folyamat
            </p>
            <h3 className="headline mt-4 text-3xl text-white sm:text-4xl">Egyszerű egyeztetés, felesleges körök nélkül</h3>
            <p className="mt-5 text-sm leading-7 text-white/76">
              Akkor működik jól egy ajánlatkérés, ha gyors, érthető és nem kér több adatot a kelleténél. Először kiválasztod az időpontot, utána néhány mezőben leírod az igényedet, én pedig személyesen visszajelzek.
            </p>
            <div className="mt-8 rounded-sm bg-white/6 p-5 text-sm leading-7 text-white/76">
              Ha most még csak tájékozódsz, akkor is érdemes elküldeni az igényt. Egy rövid egyeztetés után könnyebb eldönteni, hogy egyszeri alkalomra, rendszeres takarításra vagy nagytakarításra van-e szükség.
            </div>
          </div>

          <div className="grid gap-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="panel flex gap-4 p-4 sm:p-5"
                >
                  <div className="icon-badge mt-1 p-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">{step.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

