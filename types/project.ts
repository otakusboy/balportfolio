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
  externalUrl: string;
  layoutVariant: LayoutVariant;
  /** Main image (fills the frame). Paths resolve from /public. */
  coverImage: string;
  /** Optional poster shown by default; hover reveals coverImage. */
  posterImage?: string;
  mobileImage?: string;
  gallery?: string[];
  youtubeId?: string;
  /** Partner id for twoUp layouts */
  pairWith?: string;
  /** CSS gradient behind the image */
  mediaGradient?: string;
  /** Image inset inside the frame (px). Default: 20 */
  mediaInsetLeft?: number;
  mediaInsetRight?: number;
  /** Hide from the portfolio list without deleting */
  hidden?: boolean;
};
