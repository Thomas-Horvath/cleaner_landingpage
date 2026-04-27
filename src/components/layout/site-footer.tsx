import Link from "next/link";

import { Container } from "@/components/layout/container";
import { companyName, navigationItems } from "@/data/site-content";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-border bg-slate-950 text-white">
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow text-secondary">Projekt footer</p>
          <h2 className="mt-4 headline text-3xl text-white">{companyName}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">
            A mostani körben egy többoldalas, statikus Next.js alapot építettünk fel, amely jól
            illeszkedik a takarítási szolgáltatásokhoz és később könnyen bővíthető online
            foglalási integrációval.
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
      </Container>
    </footer>
  );
}
