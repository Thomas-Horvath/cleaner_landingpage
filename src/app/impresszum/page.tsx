import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Impresszum | Tisztaság Műhely",
  description: "A Tisztaság Műhely impresszum oldala.",
};

export default function ImpresszumPage() {
  return (
    <>
      <PageHero
        eyebrow="Jogi információ"
        title="Impresszum"
        description="Az alábbi oldalon találhatók a szolgáltatás működtetéséhez kapcsolódó alapvető azonosító és elérhetőségi adatok."
      />

      <section className="section-space section-warm pt-0">
        <Container>
          <div className="panel p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="headline text-3xl text-slate-900 sm:text-4xl">Szolgáltató adatai</h2>
                <dl className="mt-6 space-y-4 text-sm leading-7 text-foreground">
                  <div>
                    <dt className="font-semibold text-slate-900">Szolgáltató neve</dt>
                    <dd>Tisztaság Műhely</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Székhely / levelezési cím</dt>
                    <dd>8360 Keszthely, a végleges cím élesítés előtt kerül pontosításra</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Kapcsolattartó e-mail</dt>
                    <dd>hello@tisztasagmuhely.hu</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Telefonszám</dt>
                    <dd>+36 30 123 4567</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Szolgáltatási terület</dt>
                    <dd>Keszthely és környéke</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="headline text-3xl text-slate-900 sm:text-4xl">Kiegészítő információk</h2>
                <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
                  <p>
                    A weboldalon szereplő tartalmak tájékoztató jellegűek. A pontos vállalkozási adatok,
                    adószám, nyilvántartási szám és minden további kötelező jogi adat az éles indulás előtt
                    véglegesítésre kerül.
                  </p>
                  <p>
                    Ha a szolgáltatással, az adatkezeléssel vagy a foglalási folyamattal kapcsolatban kérdésed
                    van, a kapcsolat oldalon vagy a fenti elérhetőségek egyikén közvetlenül is fel tudod venni a kapcsolatot.
                  </p>
                  <p>
                    Az impresszum célja, hogy a látogatók számára átlátható legyen, ki működteti a weboldalt,
                    és milyen csatornán lehet hivatalos ügyben elérni a szolgáltatót.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
