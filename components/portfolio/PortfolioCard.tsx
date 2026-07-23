"use client";

import type { Project } from "@/types/project";
import { CARD_CORNERS } from "@/lib/card";
import { cn } from "@/lib/cn";
import { MediaVisitCursor } from "@/components/portfolio/MediaVisitCursor";
import { PortfolioMeta } from "@/components/portfolio/PortfolioMeta";
import { PortfolioVariantRenderer } from "@/components/portfolio/PortfolioVariantRenderer";

type Props = {
  project: Project;
  pair?: Project;
  priority?: boolean;
};

function hasExternalLink(project: Project) {
  return Boolean(project.externalUrl?.trim());
}

export function PortfolioCard({ project, pair, priority }: Props) {
  if (project.layoutVariant === "twoUp" && pair) {
    const bothHiddenOnMobile = project.hideOnMobile && pair.hideOnMobile;

    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-5",
          bothHiddenOnMobile && "max-[1300px]:hidden",
        )}
      >
        <LinkedItem project={{ ...project, layoutVariant: "deviceMockup" }} priority={priority} />
        <LinkedItem project={{ ...pair, layoutVariant: "deviceMockup" }} />
      </div>
    );
  }

  return <LinkedItem project={project} priority={priority} />;
}

function LinkedItem({ project, priority }: { project: Project; priority?: boolean }) {
  const mobileClass = project.hideOnMobile ? "max-[1300px]:hidden" : undefined;
  const linked = hasExternalLink(project);
  const media = <PortfolioVariantRenderer project={project} priority={priority} />;

  if (project.layoutVariant === "videoHero") {
    return (
      <article className={mobileClass}>
        {media}
        <PortfolioMeta project={project} />
      </article>
    );
  }

  if (!linked) {
    return (
      <article className={mobileClass}>
        <div className="group block">{media}</div>
        <PortfolioMeta project={project} />
      </article>
    );
  }

  return (
    <article className={mobileClass}>
      <a
        href={project.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]",
          CARD_CORNERS,
        )}
        aria-label={`${project.title} — opens in a new tab`}
      >
        <MediaVisitCursor>{media}</MediaVisitCursor>
        <PortfolioMeta project={project} />
      </a>
    </article>
  );
}
