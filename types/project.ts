/** Preset object-position keywords; any valid CSS value also works (e.g. "top right", "50% 20%"). */
export type MediaObjectPosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

/** Preset, CSS string, or two-value form — e.g. ["right", "bottom"] */
export type MediaObjectPositionValue =
  | MediaObjectPosition
  | string
  | readonly [string, string];

export type LayoutVariant =
  | "featuredWide"
  | "twoUp"
  | "videoHero"
  | "deviceMockup"
  | "editorial";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  /** External link — omit to disable the visit cursor and card link */
  externalUrl?: string;
  layoutVariant: LayoutVariant;
  /** Original project image — padded inset; shown on hover or alone when no coverImage */
  originalImage: string;
  /** Full-bleed cover shown before hover; hover reveals originalImage */
  coverImage?: string;
  mobileImage?: string;
  gallery?: string[];
  youtubeId?: string;
  /** Partner id for twoUp layouts */
  pairWith?: string;
  /** Optional CSS gradient override; defaults to solid #eef2f6 when omitted */
  mediaGradient?: string;
  /** Inset for originalImage only (px). Default: 20 left/right, 0 top/bottom. Cover is always full bleed. */
  mediaInsetLeft?: number;
  mediaInsetRight?: number;
  mediaInsetTop?: number;
  mediaInsetBottom?: number;
  /**
   * How the image fills its frame (CSS object-position). Default: "top".
   * Presets: center, top, bottom, left, right, top-left, top-right, bottom-left, bottom-right.
   * String: "top right", "50% 0%".
   * Tuple: ["right", "bottom"] for horizontal + vertical.
   */
  mediaObjectPosition?: MediaObjectPositionValue;
  /**
   * How the image scales inside its inset frame. Default: "cover" (fills & crops).
   * Use "contain" for dashboard/UI screenshots — keeps aspect ratio, centered with side padding.
   */
  mediaFit?: "cover" | "contain";
  /** Hide from the portfolio list without deleting */
  hidden?: boolean;
  /**
   * Hide this card on tablet/mobile (below `lg`).
   * Still visible on desktop. Defaults to false (shown).
   */
  hideOnMobile?: boolean;
};
