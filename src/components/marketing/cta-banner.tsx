import Link from "next/link";

import { Container } from "@/components/layout/container";

type CtaBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: { href: string; label: string };
  secondaryAction: { href: string; label: string };
};

export function CtaBanner({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: CtaBannerProps) {
  return (
    <section className="section-space pt-0">
      <Container>
        <div className="surface-dark bg-[linear-gradient(135deg,#17392c_0%,#23523f_55%,#b05a74_100%)] px-6 py-10 shadow-[0_24px_60px_rgba(23,21,21,0.18)] sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
            {eyebrow}
          </p>
          <h2 className="headline mt-4 text-4xl text-white sm:text-5xl">{title}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/82">{description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={primaryAction.href}
              className="button-light px-6 py-3 text-sm font-semibold"
            >
              {primaryAction.label}
            </Link>
            <Link
              href={secondaryAction.href}
              className="rounded-sm border border-white/22 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              {secondaryAction.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
