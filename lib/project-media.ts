import type { CSSProperties } from "react";
import type { MediaObjectPosition, MediaObjectPositionValue, Project } from "@/types/project";

const DEFAULT_MEDIA_BACKGROUND = "#eef2f6";

/** Default inset for originalImage (padded inside the frame). Cover is always full bleed. */
export const DEFAULT_MEDIA_INSET = 20;

/** Default vertical inset for originalImage. Horizontal default is DEFAULT_MEDIA_INSET. */
export const DEFAULT_MEDIA_INSET_VERTICAL = 0;

const DEFAULT_MEDIA_OBJECT_POSITION: MediaObjectPosition = "top";

const OBJECT_POSITION_CLASS: Record<MediaObjectPosition, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
  "top-left": "object-left-top",
  "top-right": "object-right-top",
  "bottom-left": "object-left-bottom",
  "bottom-right": "object-right-bottom",
};

function normalizeObjectPosition(position?: MediaObjectPositionValue): string {
  if (!position) return DEFAULT_MEDIA_OBJECT_POSITION;
  if (Array.isArray(position)) return position.join(" ");
  return String(position);
}

/** Maps preset positions to Tailwind classes; custom CSS values use inline object-position. */
export function resolveObjectPosition(position?: MediaObjectPositionValue) {
  const value = normalizeObjectPosition(position);
  const presetClass = OBJECT_POSITION_CLASS[value as MediaObjectPosition];

  if (presetClass) {
    return { className: presetClass, style: undefined };
  }

  return { className: undefined, style: { objectPosition: value } as const };
}

/** Flat color or CSS gradient/image for the project card frame background. */
export function resolveMediaBackground(background?: string): CSSProperties {
  const value = background ?? DEFAULT_MEDIA_BACKGROUND;

  if (/gradient|url\(/i.test(value)) {
    return { backgroundImage: value };
  }

  return { backgroundColor: value };
}

/** Shared ProjectCover props derived from project data */
export function projectCoverProps(project: Project) {
  return {
    coverSrc: project.coverImage,
    originalSrc: project.originalImage,
    background: project.mediaBackground,
    insetLeft: project.mediaInsetLeft ?? DEFAULT_MEDIA_INSET,
    insetRight: project.mediaInsetRight ?? DEFAULT_MEDIA_INSET,
    insetTop: project.mediaInsetTop ?? DEFAULT_MEDIA_INSET_VERTICAL,
    insetBottom: project.mediaInsetBottom ?? DEFAULT_MEDIA_INSET_VERTICAL,
    objectPosition: project.mediaObjectPosition,
    fit: project.mediaFit ?? "cover",
  };
}
