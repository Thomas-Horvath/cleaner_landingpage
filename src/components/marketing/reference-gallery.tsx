import Image from "next/image";

import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/marketing/section-intro";
import type { ReferenceItem } from "@/types/site";

export function ReferenceGallery({ items }: { items: ReferenceItem[] }) {
  return (
    <section className="section-space section-warm pt-0">
      <Container>
        <SectionIntro
          eyebrow="Hangulatképek"
          title="Minden kép ugyanazt az érzést mutatja: tisztaságot, rendezettséget és megkönnyebbülést."
          description="Akár egy otthon felfrissítéséről, akár egy kisebb munkatér rendben tartásáról van szó, a cél mindig az, hogy a tér ápolt, nyugodt és jólesően rendezett legyen."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.title} className="image-frame bg-surface">
              <div className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-[340px]">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}


