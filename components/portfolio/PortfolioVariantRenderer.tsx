import { CARD_CORNERS } from "@/lib/card";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/project";
import { ProjectVideoHero } from "@/components/portfolio/ProjectVideoHero";
import { ProjectCover } from "@/components/portfolio/ProjectCover";
import { projectCoverProps } from "@/lib/project-media";
import { DEVICE_IMAGE_SIZES } from "@/lib/image";

type Props = {
  project: Project;
  priority?: boolean;
};

export function PortfolioVariantRenderer({ project, priority }: Props) {
  switch (project.layoutVariant) {
    case "videoHero":
      return (
        <ProjectVideoHero
          title={project.title}
          posterSrc={project.originalImage}
        />
      );

    case "twoUp":
      return <WideCover project={project} priority={priority} />;

    case "deviceMockup":
      return <DeviceCover project={project} priority={priority} />;

    case "editorial":
      return (
        <div className={cn("overflow-hidden", CARD_CORNERS)}>
          <WideCover project={project} priority={priority} alt={`${project.title} cover`} />
          {project.gallery?.[0] ? (
            <ProjectCover
              {...projectCoverProps(project)}
              coverSrc={undefined}
              originalSrc={project.gallery[0]}
              alt={`${project.title} detail`}
              aspectClass="aspect-[16/10]"
              className="border-t border-[var(--border-subtle)]"
            />
          ) : null}
        </div>
      );

    case "featuredWide":
    default:
      return <WideCover project={project} priority={priority} />;
  }
}

function WideCover({
  project,
  priority,
  alt,
}: {
  project: Project;
  priority?: boolean;
  alt?: string;
}) {
  return (
    <ProjectCover
      alt={alt ?? `${project.title} preview`}
      priority={priority}
      {...projectCoverProps(project)}
    />
  );
}

function DeviceCover({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <ProjectCover
      alt={`${project.title} device preview`}
      priority={priority}
      aspectClass="aspect-[4/5] sm:aspect-[3/4]"
      sizes={DEVICE_IMAGE_SIZES}
      background={project.mediaBackground}
      fit={project.mediaFit ?? "cover"}
      originalSrc={project.mobileImage ?? project.originalImage}
      objectPosition={project.mediaObjectPosition ?? "left"}
      insetLeft={project.mediaInsetLeft ?? 0}
      insetRight={project.mediaInsetRight ?? 0}
      insetTop={project.mediaInsetTop ?? 0}
      insetBottom={project.mediaInsetBottom ?? 0}
    />
  );
}
