import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";

type HeroSplitProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: { href: string; label: string };
  secondaryAction: { href: string; label: string };
  imageSrc: string;
  imageAlt: string;
};

export function HeroSplit({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  imageSrc,
  imageAlt,
}: HeroSplitProps) {
  return (
    <section className="page-hero-space">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr] lg:items-stretch">
          <div className="panel flex flex-col justify-between p-5 sm:p-8 lg:p-10">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="headline mt-4 text-3xl leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{description}</p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href={primaryAction.href}
                className="button-primary inline-flex w-full items-center justify-center px-6 py-3 text-sm font-semibold sm:w-auto"
              >
                {primaryAction.label}
              </Link>
              <Link
                href={secondaryAction.href}
                className="button-secondary inline-flex w-full items-center justify-center px-6 py-3 text-sm font-semibold sm:w-auto"
              >
                {secondaryAction.label}
              </Link>
            </div>
          </div>

          <div className="image-frame relative min-h-[300px] sm:min-h-[380px] lg:min-h-[420px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
              <div className="max-w-md rounded-sm bg-white/12 p-4 text-white backdrop-blur-md sm:p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">
                  Első dizájnkör
                </p>
                <p className="mt-3 text-base leading-6 sm:text-lg sm:leading-7">
                  Erősebb, bizalmat építő vizuális nyitás többoldalas navigációval és saját
                  fotóanyaggal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
