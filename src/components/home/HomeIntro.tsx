import { Container } from "@/components/ui/Container";

export type IntroDict = { eyebrow: string; title: string; lead: string };
export type MetricItem = { value: string; label: string };
type HomeIntroProps = { intro: IntroDict; metrics: MetricItem[] };

export function HomeIntro({ intro, metrics }: HomeIntroProps) {
  return (
    <section className="section-spacing border-b border-line bg-ink-900/40">
      <Container>
        <div className="grid items-end gap-5 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-ar-overline text-accent-400">{intro.eyebrow}</p>
            <h2 className="mt-4 max-w-2xl text-ar-h1 text-fg">{intro.title}</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-fg-muted">{intro.lead}</p>
        </div>
        <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6 sm:gap-8">
          {metrics.map(metric => (
            <div key={metric.label} className="flex min-w-0 flex-col gap-2">
              <dt className="order-2 text-xs leading-6 text-fg-muted sm:text-sm">{metric.label}</dt>
              <dd className="order-1 text-[clamp(1.65rem,4vw,2.75rem)] font-semibold leading-tight tabular-nums text-fg" dir="ltr">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
