import type { Project } from "@/types/project";

export const DEFAULT_MEDIA_GRADIENT =
  "linear-gradient(180deg, #ffffff 0%, #000000 100%)";

export const DEFAULT_MEDIA_INSET = 20;

/** Shared ProjectCover props derived from project data */
export function projectCoverProps(project: Project) {
  return {
    coverSrc: project.posterImage,
    gradient: project.mediaGradient,
    insetLeft: project.mediaInsetLeft ?? DEFAULT_MEDIA_INSET,
    insetRight: project.mediaInsetRight ?? DEFAULT_MEDIA_INSET,
  };
}
