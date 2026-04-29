"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";

import { Container } from "@/components/layout/container";
import { companyName, navigationItems, topbarActions } from "@/data/site-content";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 border-b border-border/60 bg-[rgba(247,243,238,0.94)] shadow-[0_10px_30px_rgba(23,21,21,0.08)] backdrop-blur-xl">
      <div className="border-b border-border/60 bg-primary text-white">
        <Container className="flex flex-col gap-2 py-2.5 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p className="font-medium">Takarítási szolgáltatások otthonokra, irodákra és eseti munkákra.</p>
          <div className="flex flex-wrap gap-4 text-white/85">
            {topbarActions.map((item) => (
              <a key={item.href} href={item.href} className="rounded-sm hover:text-white focus-visible:rounded-sm">
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-3 lg:py-5">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3 rounded-sm"  onClick={() => setIsMenuOpen(false)}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-accent text-lg font-bold text-primary">
              TM
            </div>
            <div className="min-w-0">
              <p className="headline truncate text-xl font-semibold sm:text-2xl">{companyName}</p>
              <p className="truncate text-xs text-muted sm:text-sm">Tiszta, bizalomépítő, többoldalas webes megjelenés</p>
            </div>
          </Link>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Menü bezárása" : "Menü megnyitása"}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-surface text-primary lg:hidden cursor-pointer"
          >
            {isMenuOpen ? <FaXmark className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>

          <nav className="hidden items-center gap-3 text-sm font-medium lg:flex">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    item.highlight
                      ? "rounded-sm bg-primary px-5 py-3 text-white hover:bg-primary-strong"
                      : isActive
                        ? "rounded-sm bg-accent px-4 py-3 text-primary-strong"
                        : "rounded-sm px-4 py-3 text-foreground hover:bg-accent hover:text-secondary"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div
          id="mobile-navigation"
          className={`${isMenuOpen ? "grid" : "hidden"} pt-4 lg:hidden`}
        >
          <nav
            aria-label="Mobil navigáció"
            className="panel grid gap-2 p-3"
          >
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={
                    item.highlight
                      ? "rounded-sm bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-strong"
                      : isActive
                        ? "rounded-sm bg-accent px-4 py-3 text-sm font-semibold text-primary-strong"
                        : "rounded-sm px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent hover:text-secondary"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </Container>
    </header>
  );
}
