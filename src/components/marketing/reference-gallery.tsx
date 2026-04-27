import Image from "next/image";

import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/marketing/section-intro";
import type { ReferenceItem } from "@/types/site";

export function ReferenceGallery({ items }: { items: ReferenceItem[] }) {
  return (
    <section className="section-space pt-0">
      <Container>
        <SectionIntro
          eyebrow="Referenciaoldal"
          title="A külön referenciák oldal erősebb bizalomépítő elem, mint ha minden a főoldalra zsúfolódna."
          description="A mostani első körben stock fotókkal dolgozunk, de a struktúra már alkalmas saját munkaképek, előtte-utána párok és ügyfélvélemények fogadására is."
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
