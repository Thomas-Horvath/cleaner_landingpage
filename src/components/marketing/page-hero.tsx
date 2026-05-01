import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="page-hero-space section-soft">
      <Container>
        <div className="panel px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="max-w-4xl">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="headline mt-4 text-3xl leading-tight sm:text-5xl sm:leading-tight lg:text-6xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{description}</p>
          </div>

          {actions ? <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}

export function HeroLink({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={
        variant === "primary"
          ? "button-primary inline-flex w-full items-center justify-center px-6 py-3 text-sm font-semibold sm:w-auto"
          : "button-secondary inline-flex w-full items-center justify-center px-6 py-3 text-sm font-semibold sm:w-auto"
      }
    >
      {label}
    </Link>
  );
}

