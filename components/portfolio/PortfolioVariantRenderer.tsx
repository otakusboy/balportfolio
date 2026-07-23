import type { Project } from "@/types/project";
import { LiteYouTubeEmbed } from "@/components/portfolio/LiteYouTubeEmbed";
import { ProjectCover } from "@/components/portfolio/ProjectCover";
import { projectCoverProps, DEFAULT_MEDIA_INSET, DEFAULT_MEDIA_INSET_VERTICAL } from "@/lib/project-media";

type Props = {
  project: Project;
  priority?: boolean;
};

export function PortfolioVariantRenderer({ project, priority }: Props) {
  switch (project.layoutVariant) {
    case "videoHero":
      return (
        <LiteYouTubeEmbed
          videoId={project.youtubeId ?? ""}
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
        <div className="overflow-hidden rounded-[10px]">
          <WideCover project={project} priority={priority} alt={`${project.title} cover`} />
          {project.gallery?.[0] ? (
            <ProjectCover
              originalSrc={project.gallery[0]}
              alt={`${project.title} detail`}
              aspectClass="aspect-[16/10]"
              className="border-t border-[var(--border-subtle)]"
              insetLeft={project.mediaInsetLeft ?? DEFAULT_MEDIA_INSET}
              insetRight={project.mediaInsetRight ?? DEFAULT_MEDIA_INSET}
              insetTop={project.mediaInsetTop ?? DEFAULT_MEDIA_INSET_VERTICAL}
              insetBottom={project.mediaInsetBottom ?? DEFAULT_MEDIA_INSET_VERTICAL}
              gradient={project.mediaGradient}
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
      sizes="(max-width: 640px) 100vw, 28vw"
      {...projectCoverProps(project)}
      fit="cover"
      originalSrc={project.mobileImage ?? project.originalImage}
      insetLeft={project.mediaInsetLeft ?? 0}
      insetRight={project.mediaInsetRight ?? 0}
      insetTop={project.mediaInsetTop ?? 0}
      insetBottom={project.mediaInsetBottom ?? 0}
      objectPosition={project.mediaObjectPosition ?? "left"}
    />
  );
}
