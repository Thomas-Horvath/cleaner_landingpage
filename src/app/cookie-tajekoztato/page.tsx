import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Cookie tájékoztató | Tisztaság Műhely",
  description: "A Tisztaság Műhely cookie tájékoztató oldala.",
};

export default function CookiePage() {
  return (
    <>
      <PageHero
        eyebrow="Jogi információ"
        title="Cookie tájékoztató"
        description="Ez az oldal összefoglalja, hogyan használ a weboldal sütiket és egyéb technikai megoldásokat a működéshez."
      />

      <section className="section-space section-warm pt-0">
        <Container>
          <div className="panel space-y-8 p-6 sm:p-8 lg:p-10">
            <section>
              <h2 className="headline text-3xl text-slate-900 sm:text-4xl">Mik azok a cookie-k?</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                A cookie-k kis adatfájlok, amelyeket a böngésző tárolhat az eszközödön.
                Ezek segíthetnek abban, hogy a weboldal technikailag megfelelően működjön,
                vagy hogy bizonyos beállításokat megjegyezzen.
              </p>
            </section>

            <section>
              <h2 className="headline text-3xl text-slate-900 sm:text-4xl">Milyen cookie-kat használhat az oldal?</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                A jelenlegi működés során elsősorban technikailag szükséges megoldások lehetnek használatban,
                például az admin belépéshez kapcsolódó munkamenet-kezelés. A későbbiekben, ha statisztikai vagy marketing célú cookie-k is bekerülnek,
                ez a tájékoztató annak megfelelően frissülni fog.
              </p>
            </section>

            <section>
              <h2 className="headline text-3xl text-slate-900 sm:text-4xl">Hogyan tudod kezelni a cookie-kat?</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                A legtöbb böngésző lehetőséget ad arra, hogy a cookie-k használatát korlátozd,
                töröld a már eltárolt sütiket, vagy teljesen letiltsd azok használatát.
                Ennek módja böngészőnként eltérő, ezért érdemes a saját böngésződ beállításait megnézni.
              </p>
            </section>

            <section>
              <h2 className="headline text-3xl text-slate-900 sm:text-4xl">Kapcsolat</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Ha a sütikezeléssel kapcsolatban kérdésed van, a hello@tisztasagmuhely.hu e-mail címen tudsz érdeklődni.
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
