import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { buildMetadata, siteUrl } from "@/lib/seo";
import { localePath } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return buildMetadata({ locale, path: "/about", title: locale === "ar" ? "من نحن — أربك" : "About ARBEC — Engineering, Contracting & Supplies", description: locale === "ar" ? "تعرف على أربك وخدماتها الهندسية والمقاولات والتوريدات." : "Learn about ARBEC and its engineering, contracting and supplies work." });
}

export default async function AboutPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const ar = locale === "ar";
  const content = ar ? {
    eyebrow: "أربك · من نحن",
    title: "هندسة ومقاولات وتوريدات ضمن منظومة واحدة.",
    lead: "أربك شركة هندسية مصرية متعددة التخصصات، تجمع بين المكتب الفني وأعمال المقاولات والتوريدات.",
    record: "عن أربك",
    recordLead: "تأسست أربك في مصر عام 2019، ويقودها المهندس هيثم م. قطب. تتكامل مجالات عمل الشركة من التصميم والمكتب الفني إلى التنفيذ والتوريدات.",
    disciplines: "مجالات العمل",
    contact: "ناقش مشروعك",
    contactLead: "ابدأ محادثة مع الفريق عبر قنوات التواصل المباشرة، أو جهّز تفاصيل مشروعك في رسالة بريد.",
  } : {
    eyebrow: "ARBEC · ABOUT",
    title: "Engineering, contracting and supplies in one system.",
    lead: "ARBEC is an Egyptian multidisciplinary engineering firm bringing together technical-office work, contracting and supplies.",
    record: "About ARBEC",
    recordLead: "Founded in Egypt in 2019 and led by Eng. Haytham M. Kotb, ARBEC brings together design and technical-office capabilities with execution and supplies.",
    disciplines: "Working disciplines",
    contact: "Discuss your project",
    contactLead: "Start a conversation through our direct channels, or prepare your project details in an email.",
  };
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", url: `${siteUrl}${localePath(locale, "/about")}`, name: content.title, inLanguage: locale, about: { "@id": `${siteUrl}/#organization` } }} />
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <header className="max-w-3xl">
          <p className="text-ar-overline text-accent-400">{content.eyebrow}</p>
          <h1 className="mt-4 text-ar-display text-fg">{content.title}</h1>
          <p className="mt-5 max-w-2xl text-ar-body-lg leading-relaxed text-fg-muted">{content.lead}</p>
        </header>
        <section className="mt-10 grid gap-6 border-t border-line pt-8 lg:grid-cols-[1fr_1.3fr]" aria-labelledby="record-title">
          <div><p className="text-ar-overline text-accent-400">01</p><h2 id="record-title" className="mt-3 text-ar-h2 text-fg">{content.record}</h2></div>
          <div>
            <p className="leading-relaxed text-fg-muted">{content.recordLead}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-line bg-white/[0.02] p-4"><dt className="text-xs text-fg-subtle">{ar ? "التأسيس" : "Founded"}</dt><dd className="mt-2 font-mono text-xl text-fg">{company.foundedYear}</dd></div>
              <div className="rounded-xl border border-line bg-white/[0.02] p-4"><dt className="text-xs text-fg-subtle">{ar ? "مشروعات في معرض الأعمال" : "Featured project records"}</dt><dd className="mt-2 font-mono text-xl text-fg">{projects.length}</dd></div>
            </dl>
          </div>
        </section>
        <section className="mt-10 border-t border-line pt-8" aria-labelledby="disciplines-title">
          <p className="text-ar-overline text-accent-400">02</p><h2 id="disciplines-title" className="mt-3 text-ar-h2 text-fg">{content.disciplines}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => <article key={service.slug} className="rounded-xl border border-line bg-white/[0.02] p-5">
              <p className="font-mono text-xs text-accent-400">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-lg text-fg"><a href={localePath(locale, `/services/${service.slug}`)} className="hover:text-accent-300">{ar ? service.titleAr : service.title}</a></h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{ar ? service.shortDescriptionAr : service.shortDescription}</p>
            </article>)}
          </div>
        </section>
        <section className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-ar-overline text-accent-400">03</p><h2 className="mt-3 text-ar-h2 text-fg">{content.contact}</h2><p className="mt-2 max-w-xl text-sm leading-relaxed text-fg-muted">{content.contactLead}</p></div>
          <Button href={localePath(locale, "/contact")} size="md">{dict.actions.getInTouch}</Button>
        </section>
      </div>
    </>
  );
}
