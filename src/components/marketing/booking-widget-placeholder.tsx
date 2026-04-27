import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/marketing/section-intro";

export function BookingWidgetPlaceholder() {
  return (
    <section className="section-space pt-0">
      <Container>
        <SectionIntro
          eyebrow="Widget helye"
          title="Ide kerül majd a SimplyBook.me beágyazott foglalási felülete."
          description="A blokk már most úgy van kialakítva, hogy mobilon egyoszlopos maradjon, asztali nézeten pedig kényelmes szélességben jelenjen meg a későbbi widget."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="panel p-5 sm:p-6">
            <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">Beágyazási előkészítés</h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground">
              <li className="tag-soft px-4 py-3">A widget külön szekcióban fog futni, nem hero fölött.</li>
              <li className="tag-soft px-4 py-3">Mobilon 100% szélességet kap, oldalirányú scroll nélkül.</li>
              <li className="tag-soft px-4 py-3">A foglalási CTA-k erre a blokkra vagy ugyanerre az oldalra mutathatnak.</li>
            </ul>
          </div>

          <div className="widget-shell border border-border/60 p-3 sm:p-4">
            <div className="flex items-center justify-between border-b border-border/60 px-2 pb-3 text-xs uppercase tracking-[0.2em] text-muted sm:px-3">
              <span>SimplyBook.me widget</span>
              <span>mobilbarát keret</span>
            </div>
            <div className="flex min-h-[480px] items-center justify-center bg-[rgba(23,21,21,0.03)] px-5 py-8 sm:min-h-[620px]">
              <div className="max-w-lg text-center">
                <p className="headline text-2xl sm:text-3xl">Beágyazott foglalási felület helye</p>
                <p className="mt-4 text-sm leading-7 text-muted">
                  A következő körben ide kerülhet a SimplyBook.me által adott script vagy iframe alapú widget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
