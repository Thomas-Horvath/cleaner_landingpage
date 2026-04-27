import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/marketing/section-intro";
import { contactDetails } from "@/data/site-content";

const icons = [FaPhone, FaEnvelope, FaLocationDot];

export function ContactGrid() {
  return (
    <section className="section-space pt-0">
      <Container>
        <SectionIntro
          eyebrow="Kapcsolat"
          title="Külön oldalon jobban működik a bizalomépítés, mint egy zsúfolt footerben."
          description="A kapcsolat oldal most még statikus, de a későbbiekben itt lehet majd térképet, nyitvatartást, adatkezelési linkeket és külső űrlap-integrációt is elhelyezni."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {contactDetails.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <a
                key={item.label}
                href={item.href}
                className="panel p-6 transition hover:-translate-y-0.5"
              >
                <div className="icon-badge inline-flex p-3">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-muted">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
