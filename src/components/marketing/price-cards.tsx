import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/marketing/section-intro";
import type { PriceItem } from "@/types/site";

export function PriceCards({ items }: { items: PriceItem[] }) {
  return (
    <section className="section-space section-warm pt-0">
      <Container>
        <SectionIntro
          eyebrow="Árképzés"
          title="Az árak minden esetben az adott feladathoz igazodnak."
          description="A takarításnál sokat számít a lakás vagy iroda mérete, az aktuális állapot, a feladat részletessége és az, hogy egyszeri vagy rendszeres munkáról van-e szó. Emiatt pontos összeget csak rövid egyeztetés után lehet korrekt módon adni."
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


