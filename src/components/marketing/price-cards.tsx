import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/marketing/section-intro";
import type { PriceItem } from "@/types/site";

export function PriceCards({ items }: { items: PriceItem[] }) {
  return (
    <section className="section-space pt-0">
      <Container>
        <SectionIntro
          eyebrow="Árképzés"
          title="Az árak most szándékosan ajánlat-alapú kommunikációval szerepelnek."
          description="A takarítási oldalaknál gyakran félrevezető a fix listaár. Ezért a dizájnban azt hangsúlyozzuk, hogy pontos felmérés után adható korrekt ajánlat."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="panel p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                {item.title}
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-slate-900">{item.price}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-foreground">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="tag-soft px-4 py-3">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
