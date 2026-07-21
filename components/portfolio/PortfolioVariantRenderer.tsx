import type { Project } from "@/types/project";
import { LiteYouTubeEmbed } from "@/components/portfolio/LiteYouTubeEmbed";
import { ProjectCover } from "@/components/portfolio/ProjectCover";
import { projectCoverProps } from "@/lib/project-media";

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
          posterSrc={project.coverImage}
        />
      );

    case "twoUp":
      // PortfolioCard handles paired twoUp layouts; this is the fallback for a missing partner
      return <WideCover project={project} priority={priority} />;

    case "deviceMockup":
      return <DeviceCover project={project} priority={priority} />;

    case "editorial":
      return (
        <div className="overflow-hidden rounded-[2px]">
          <WideCover project={project} priority={priority} alt={`${project.title} cover`} />
          {project.gallery?.[0] ? (
            <ProjectCover
              src={project.gallery[0]}
              alt={`${project.title} detail`}
              aspectClass="aspect-[16/10]"
              className="border-t border-[var(--border-subtle)]"
              {...projectCoverProps(project)}
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
      src={project.coverImage}
      alt={alt ?? `${project.title} preview`}
      priority={priority}
      {...projectCoverProps(project)}
    />
  );
}

function DeviceCover({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <ProjectCover
      src={project.mobileImage ?? project.coverImage}
      alt={`${project.title} device preview`}
      priority={priority}
      aspectClass="aspect-[4/5] sm:aspect-[3/4]"
      sizes="(max-width: 640px) 100vw, 28vw"
      fit="cover"
      position="left"
      {...projectCoverProps(project)}
    />
  );
}
