import type { Project } from "@/types/project";

type Props = {
  project: Project;
  className?: string;
};

export function PortfolioMeta({ project, className }: Props) {
  return (
    <div
      className={`mt-3 flex items-start justify-between gap-4 px-0.5 ${className ?? ""}`}
    >
      <div className="min-w-0">
        <h3 className="truncate text-[15px] font-semibold leading-tight tracking-[-0.01em] text-[var(--text)]">
          {project.title}
        </h3>
        <p className="mt-1 text-[13px] leading-snug text-[var(--text-muted)]">
          {project.subtitle}
        </p>
      </div>
      <p className="shrink-0 pt-0.5 text-[13px] text-[var(--text-muted)]">
        {project.year}
      </p>
    </div>
  );
}
