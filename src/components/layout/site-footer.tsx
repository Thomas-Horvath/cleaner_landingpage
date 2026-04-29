import Link from "next/link";

import { Container } from "@/components/layout/container";
import { companyName, navigationItems } from "@/data/site-content";

const hiddenAdminPath = "/muhely-belepes";
const currentYear = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-border bg-slate-950 text-white">
      <Container>
        <div className="grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow text-secondary">Kapcsolat és információ</p>
            <h2 className="mt-4 headline text-3xl text-white">{companyName}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">
              Otthonos, alapos és megbízható takarítási segítség lakásokhoz, családi házakhoz és
              kisebb irodákhoz. Ha rendszeres segítséget keresel, vagy egyszeri nagytakarításra
              lenne szükséged, itt minden fontos információt egy helyen megtalálsz.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm border border-white/10 px-5 py-4 text-sm text-white/86 hover:border-secondary hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-white/52 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {currentYear} {companyName}. Minden jog fenntartva.</p>
          <Link href={hiddenAdminPath} className="w-fit text-white/45 transition hover:text-white/72">
            Belépés
          </Link>
        </div>
      </Container>
    </footer>
  );
}
