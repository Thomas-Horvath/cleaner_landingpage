"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";

import { Container } from "@/components/layout/container";
import { companyName, navigationItems, topbarActions } from "@/data/site-content";

function isNavigationItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getNavigationLinkClass(isActive: boolean, isHighlight: boolean, isMobile = false) {
  const baseClass = isMobile
    ? "rounded-sm px-4 py-3 text-sm font-semibold"
    : "rounded-sm px-4 py-3 text-sm font-medium";

  if (isHighlight) {
    return `${baseClass} bg-primary text-white hover:bg-primary-strong`;
  }

  if (isActive) {
    return `${baseClass} bg-accent-strong text-primary-strong`;
  }

  return `${baseClass} text-foreground hover:bg-accent hover:text-secondary`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 border-b border-border/60 bg-[rgba(247,243,238,0.94)] shadow-[0_10px_30px_rgba(23,21,21,0.08)] backdrop-blur-xl">
      <div className="border-b border-border/60 bg-primary text-white">
        <Container className="flex flex-col gap-2 py-2.5 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p className="font-medium">Takarítási szolgáltatások Keszthelyen és a környező településeken.</p>
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
          <Link href="/" className="flex min-w-0 items-center gap-3 rounded-sm" onClick={() => setIsMenuOpen(false)}>
            <div className="relative h-14 w-14  overflow-hidden bg-transparent">
              <Image
                src="/brand-mark.svg"
                alt="Tisztaság Műhely logó"
                fill
                sizes="50px"
                className="object-contain"
                priority
              />
            </div>
            <div className="min-w--0">
              <p className="headline truncate text-xl font-semibold sm:text-2xl">{companyName}</p>
              <p className="truncate text-xs text-muted sm:text-sm">Lakásokhoz, kisebb irodákhoz és alkalmi takarításokhoz</p>
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

          <nav className="hidden items-center gap-3 lg:flex">
            {navigationItems.map((item) => {
              const isActive = isNavigationItemActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={getNavigationLinkClass(isActive, Boolean(item.highlight))}
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
              const isActive = isNavigationItemActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={getNavigationLinkClass(isActive, Boolean(item.highlight), true)}
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

