import type { Project } from "@/types/project";

type Props = {
  project: Project;
};

export function PortfolioMeta({ project }: Props) {
  return (
    <div className="mt-4 flex items-start justify-between gap-4 px-0.5">
      <div className="min-w-0">
        <h3 className="truncate text-[15px] font-medium leading-tight tracking-[-0.01em] text-[var(--text)] min-[1301px]:text-[16px] min-[1301px]:font-semibold">
          {project.title}
        </h3>
        <p className="mt-1 text-[15px] leading-snug text-[var(--text-muted)] max-[1024px]:hidden">
          {project.subtitle}
        </p>
      </div>
      <p className="shrink-0 pt-0.5 text-[15px] text-[var(--text-muted)] max-[1024px]:hidden">
        {project.year}
      </p>
    </div>
  );
}
