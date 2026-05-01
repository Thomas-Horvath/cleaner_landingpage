import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Adatvédelem | Tisztaság Műhely",
  description: "A Tisztaság Műhely adatvédelmi tájékoztatója.",
};

export default function AdatvedelemPage() {
  return (
    <>
      <PageHero
        eyebrow="Jogi információ"
        title="Adatvédelmi tájékoztató"
        description="Az ajánlatkérés során megadott személyes adatok kezelésével kapcsolatos legfontosabb tudnivalók itt találhatók."
      />

      <section className="section-space section-warm pt-0">
        <Container>
          <div className="panel space-y-8 p-6 sm:p-8 lg:p-10">
            <section>
              <h2 className="headline text-3xl text-slate-900 sm:text-4xl">Milyen adatokat kezelünk?</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Az ajánlatkérés és a kapcsolatfelvétel során a név, e-mail cím, telefonszám, cím,
                a kiválasztott időpont és az üzenet mezőben megadott további információk kerülhetnek kezelésre.
              </p>
            </section>

            <section>
              <h2 className="headline text-3xl text-slate-900 sm:text-4xl">Miért kezeljük ezeket az adatokat?</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Az adatok kezelésének célja az ajánlatkérés fogadása, a visszajelzés megküldése,
                az időpont-egyeztetés, valamint a szolgáltatás teljesítésének előkészítése.
              </p>
            </section>

            <section>
              <h2 className="headline text-3xl text-slate-900 sm:text-4xl">Meddig őrizzük meg az adatokat?</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                A személyes adatokat csak addig őrizzük meg, ameddig az ajánlatadás, az egyeztetés,
                a szolgáltatás teljesítése vagy a kapcsolódó adminisztráció ezt indokolja.
                A végleges megőrzési idők az éles működés előtt a vállalkozási és számviteli kötelezettségekhez igazítva kerülnek pontosításra.
              </p>
            </section>

            <section>
              <h2 className="headline text-3xl text-slate-900 sm:text-4xl">Kik férhetnek hozzá az adatokhoz?</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Az adatokhoz kizárólag a szolgáltatás működtetésében részt vevő személyek férhetnek hozzá,
                illetve azok a technikai szolgáltatók, akik a tárhelyet, az adatbázist vagy a kapcsolódó technikai rendszereket biztosítják.
              </p>
            </section>

            <section>
              <h2 className="headline text-3xl text-slate-900 sm:text-4xl">Milyen jogaid vannak?</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Bármikor kérheted a rólad tárolt adatokhoz való hozzáférést, azok helyesbítését,
                törlését vagy az adatkezelés korlátozását. Ezzel kapcsolatban a hello@tisztasagmuhely.hu címen tudsz érdeklődni.
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
