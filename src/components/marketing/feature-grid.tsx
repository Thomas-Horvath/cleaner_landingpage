import { FaArrowRight, FaShieldHeart, FaSwatchbook, FaCalendarCheck } from "react-icons/fa6";

import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/marketing/section-intro";
import type { FeatureItem } from "@/types/site";

const icons = [FaSwatchbook, FaShieldHeart, FaCalendarCheck];

type FeatureGridProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: FeatureItem[];
};

export function FeatureGrid({
  eyebrow,
  title,
  description,
  items,
}: FeatureGridProps) {
  return (
    <section className="section-space section-soft">
      <Container>
        <SectionIntro eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-dark p-5 sm:p-7 lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
              Nyugodt működés
            </p>
            <h3 className="headline mt-4 text-3xl text-white sm:text-4xl">
              Akkor jó az együttműködés, ha a tisztaság mellett a bizalom is magától értetődő.
            </h3>
            <p className="mt-5 text-sm leading-7 text-white/78">
              Sokan nemcsak takarítót keresnek, hanem valakit, akire nyugodtan rá lehet bízni az
              otthont vagy a kisebb munkahelyi tereket. Ezt a biztonságot és kiszámíthatóságot
              szeretném képviselni minden egyeztetésnél és minden munkánál.
            </p>
            <div className="mt-7 inline-flex items-center gap-3 rounded-sm border border-white/14 px-4 py-3 text-sm font-semibold sm:mt-8 sm:px-5">
              Keszthely és környéke
              <FaArrowRight className="h-4 w-4" />
            </div>
          </div>

          <div className="grid gap-4">
            {items.map((item, index) => {
              const Icon = icons[index % icons.length];

              return (
                <article
                  key={item.title}
                  className="panel flex gap-4 p-4 sm:p-5"
                >
                  <div className="icon-badge mt-1 p-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
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

