import Image from "next/image";

import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/marketing/section-intro";
import { referenceItems } from "@/data/site-content";

export function ImageShowcase() {
  return (
    <section className="section-space section-warm">
      <Container>
        <SectionIntro
          eyebrow="Referenciaképek"
          title="Néhány hangulatkép arról, milyen tiszta, rendezett összhatásra számíthatsz."
          description="A referenciaoldal képi világa azt mutatja meg, milyen típusú otthonokhoz, részletekhez és munkaterekhez illeszkedik leginkább ez a szolgáltatás."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {referenceItems.map((item, index) => (
            <article
              key={item.title}
              className={`image-frame bg-surface ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div
                className={`relative ${
                  index === 0 ? "min-h-[260px] sm:min-h-[360px] lg:min-h-[420px]" : "min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]"
                }`}
              >
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


