import { FaCalendarDays, FaFileSignature, FaPhoneVolume } from "react-icons/fa6";

import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/marketing/section-intro";

const steps = [
  {
    title: "1. Rövid igényfelmérés",
    description:
      "A látogató megadja, milyen típusú takarítást keres, és melyik városrészben lenne rá szükség.",
    icon: FaFileSignature,
  },
  {
    title: "2. Visszahívás vagy e-mail",
    description:
      "A kapcsolatfelvétel külső űrlap vagy SimplyBook.me folyamat felé terelhető a következő körben.",
    icon: FaPhoneVolume,
  },
  {
    title: "3. Időpont vagy foglalás",
    description:
      "Itt tud később belépni az online foglalási rendszer, backend fejlesztés nélkül is.",
    icon: FaCalendarDays,
  },
];

export function InquiryLayout() {
  return (
    <section className="section-space pt-0">
      <Container>
        <SectionIntro
          eyebrow="Ajánlatkérés"
          title="Az ajánlatkérő oldal külön konverziós céloldalként működik."
          description="Mivel a projekt statikus tárhelyre készül, ebben a körben nem építünk saját űrlap-backendet. A vizuális és tartalmi helyét viszont most kialakítjuk."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="surface-dark p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
              Következő integráció
            </p>
            <h3 className="headline mt-4 text-4xl text-white">SimplyBook.me vagy külső űrlap szolgáltatás</h3>
            <p className="mt-5 text-sm leading-7 text-white/76">
              Itt lehet majd dönteni arról, hogy inkább közvetlen időpontfoglalást vagy előzetes
              ajánlatkérést szeretnénk. A mostani UI mindkét irányhoz alkalmas.
            </p>
            <div className="mt-8 rounded-sm bg-white/6 p-5 text-sm leading-7 text-white/76">
              Javaslat: ha a szolgáltatás erősen egyedi, az ajánlatkérés legyen az elsődleges CTA,
              és csak a fixen csomagolható szolgáltatások kapjanak közvetlen online foglalást.
            </div>
          </div>

          <div className="grid gap-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="panel flex gap-4 p-5"
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
