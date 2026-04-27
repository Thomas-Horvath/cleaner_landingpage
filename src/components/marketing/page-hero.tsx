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
    <section className="page-hero-space">
      <Container>
        <div className="panel px-6 py-10 sm:px-10">
          <div className="max-w-4xl">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="headline mt-5 text-5xl leading-tight sm:text-6xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{description}</p>
          </div>

          {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
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
          ? "button-primary px-6 py-3 text-sm font-semibold"
          : "button-secondary px-6 py-3 text-sm font-semibold"
      }
    >
      {label}
    </Link>
  );
}
