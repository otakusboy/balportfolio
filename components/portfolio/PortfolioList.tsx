import {
  getProjectById,
  getRenderableProjects,
} from "@/data/projects";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";

export function PortfolioList() {
  const items = getRenderableProjects();

  return (
    <div className="flex flex-col gap-10 md:gap-12">
      {items.map((project, index) => {
        const pair =
          project.layoutVariant === "twoUp" && project.pairWith
            ? getProjectById(project.pairWith)
            : undefined;

        return (
          <PortfolioCard
            key={project.id}
            project={project}
            pair={pair}
            priority={index < 2}
          />
        );
      })}
    </div>
  );
}
