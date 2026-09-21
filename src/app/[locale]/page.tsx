import { HomeHero } from "@/components/home/HomeHero";
import { HomeIntro } from "@/components/home/HomeIntro";
import { EngineeringCore } from "@/components/engineering/EngineeringCore";
import { IdeaToReality } from "@/components/evolution/IdeaToReality";
import { InfrastructureExperience } from "@/components/infrastructure/InfrastructureExperience";
import { ProjectRadar } from "@/components/radar/ProjectRadar";
import { ServicesSection } from "@/components/services/ServicesSection";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { localePath } from "@/lib/utils";

export default async function HomePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  const metrics = [
    {
      value: `${company.stats.projectsFinished}+`,
      label: dict.home.metrics.projects,
    },
    {
      value: `${company.stats.yearsExperience}+`,
      label: dict.home.metrics.years,
    },
    {
      value: String(company.stats.foundedYear),
      label: dict.home.metrics.founded,
    },
  ];

  return (
    <>
      <HomeHero
        locale={locale}
        hero={dict.home.hero}
        exploreWork={dict.actions.exploreWork}
        startProject={dict.actions.startProject}
        projectsHref={localePath(locale, "/projects")}
        contactHref={localePath(locale, "/contact")}
      />
      <HomeIntro intro={dict.home.intro} metrics={metrics} />
      <EngineeringCore dict={dict.engineering} />
      <IdeaToReality dict={dict.ideaToReality} />
      <ServicesSection locale={locale} dict={dict.services} />
      <InfrastructureExperience
        locale={locale}
        dict={dict.infrastructure}
        serviceDict={dict.services}
      />
      <ProjectRadar locale={locale} dict={dict.projects} />
      <section aria-labelledby="project-conversation" className="border-t border-line bg-ink-900 py-10 sm:py-12">
        <Container className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h2 id="project-conversation" className="text-ar-h2 text-fg">{locale === "ar" ? "لنبدأ بمشروعك القادم." : "Let's build what comes next."}</h2>
            <p className="mt-2 text-sm leading-7 text-fg-muted">{locale === "ar" ? "حدّد نطاق العمل وتواصل مع الفريق المناسب." : "Share your project scope with the right team."}</p>
          </div>
          <Button href={localePath(locale, "/contact")} size="lg">{dict.actions.startProject}</Button>
        </Container>
      </section>
    </>
  );
}
