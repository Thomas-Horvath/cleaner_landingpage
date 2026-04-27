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
    <section className="section-space bg-white/20">
      <Container>
        <SectionIntro eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-dark p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
              Új irány
            </p>
            <h3 className="headline mt-4 text-4xl text-white">
              Kevesebb zsúfoltság, erősebb bizalomépítés.
            </h3>
            <p className="mt-5 text-sm leading-7 text-white/78">
              A többoldalas szerkezet célja, hogy a látogató gyorsan megértse, milyen típusú
              munkákat vállal a szolgáltató, hogyan kérhet ajánlatot, és hová kerül majd az
              online foglalás.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-sm border border-white/14 px-5 py-3 text-sm font-semibold">
              Főoldal + 5 aloldal
              <FaArrowRight className="h-4 w-4" />
            </div>
          </div>

          <div className="grid gap-4">
            {items.map((item, index) => {
              const Icon = icons[index % icons.length];

              return (
                <article
                  key={item.title}
                  className="panel flex gap-4 p-5"
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
