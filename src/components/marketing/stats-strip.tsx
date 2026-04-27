import { Container } from "@/components/layout/container";
import type { StatItem } from "@/types/site";

export function StatsStrip({ items }: { items: StatItem[] }) {
  return (
    <section className="pb-6">
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.label} className="panel px-6 py-6">
              <p className="headline text-4xl font-semibold text-primary">{item.value}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{item.label}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
