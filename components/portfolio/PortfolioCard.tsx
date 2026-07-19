"use client";

import type { Project } from "@/types/project";
import { MediaVisitCursor } from "@/components/portfolio/MediaVisitCursor";
import { PortfolioMeta } from "@/components/portfolio/PortfolioMeta";
import { PortfolioVariantRenderer } from "@/components/portfolio/PortfolioVariantRenderer";

type Props = {
  project: Project;
  pair?: Project;
  priority?: boolean;
};

export function PortfolioCard({ project, pair, priority }: Props) {
  if (project.layoutVariant === "twoUp" && pair) {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-5">
        <LinkedItem project={{ ...project, layoutVariant: "deviceMockup" }} priority={priority} />
        <LinkedItem project={{ ...pair, layoutVariant: "deviceMockup" }} />
      </div>
    );
  }

  return <LinkedItem project={project} priority={priority} />;
}

function LinkedItem({ project, priority }: { project: Project; priority?: boolean }) {
  if (project.youtubeId) {
    return (
      <article>
        <PortfolioVariantRenderer project={project} priority={priority} />
        <PortfolioMeta project={project} />
      </article>
    );
  }

  return (
    <article>
      <a
        href={project.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
        aria-label={`${project.title} — opens in a new tab`}
      >
        <MediaVisitCursor>
          <PortfolioVariantRenderer project={project} priority={priority} />
        </MediaVisitCursor>
        <PortfolioMeta project={project} />
      </a>
    </article>
  );
}
