import { FaBucket, FaBuilding, FaHouse, FaWandSparkles } from "react-icons/fa6";

import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/marketing/section-intro";
import type { ServiceItem } from "@/types/site";

const icons = [FaHouse, FaBuilding, FaWandSparkles, FaBucket];

type ServiceCardsProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: ServiceItem[];
};

export function ServiceCards({
  eyebrow,
  title,
  description,
  items,
}: ServiceCardsProps) {
  return (
    <section className="section-space section-warm">
      <Container>
        <SectionIntro eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <article key={item.title} className="panel p-5 sm:p-6">
                <div className="icon-badge inline-flex p-3">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900 sm:mt-5 sm:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="tag-soft px-4 py-3">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


