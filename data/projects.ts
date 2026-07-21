import type { Project } from "@/types/project";

/**
 * Portfolio data — edit here to change what appears on the site.
 *
 * Layout variants:
 * - videoHero     YouTube embed (set youtubeId)
 * - featuredWide  Single wide image
 * - deviceMockup  Tall device frame (optional mobileImage)
 * - twoUp         Two device frames side by side (set pairWith)
 * - editorial     Cover + optional second image from gallery[0]
 *
 * Images:
 * - originalImage  Project image with inset padding (shown alone, or on hover)
 * - coverImage     Optional full-bleed cover shown before hover
 *
 * Media options:
 * - mediaGradient         Custom background gradient (default: solid #eef2f6)
 * - mediaInsetLeft/Right  Inset for originalImage only in px (default: 20)
 * - mediaInsetTop/Bottom   Inset for originalImage only in px (default: 0)
 * - mediaObjectPosition   How the image fills its frame (default: "top")
 * - mediaFit              "cover" (default, fills & crops) or "contain" (keeps ratio)
 * - hidden                Remove from the list without deleting
 * - hideOnMobile          Hide below the `lg` breakpoint
 *
 * Dashboard / UI screenshots (e.g. Appreal):
 * Every card uses a fixed 16:11 frame with #eef2f6 background. The image sits
 * inside with 20px left/right inset by default. For a single dashboard screen:
 *   mediaFit: "contain"
 *   mediaObjectPosition: "center"
 * Optional: increase mediaInsetLeft/Right or mediaInsetTop/Bottom for more breathing room.
 * Export wide (16:10 or 16:9) — letterboxing above/below is filled by the frame bg.
 * Landing pages & mockups: keep defaults (cover + top) so they fill the frame.
 *
 * externalUrl — omit to show the card without a link or visit cursor.
 *
 * mediaObjectPosition — presets: center, top, bottom, left, right,
 *   top-left, top-right, bottom-left, bottom-right.
 *   String: "top right", "50% 0%".
 *   Tuple: ["right", "bottom"] for horizontal + vertical.
 *   Device mockups default to "left" unless overridden.
 */
export const projects: Project[] = [
  {
    id: "landing-page-works",
    title: "Landing page works",
    subtitle: "UI/UX Design & Redesign",
    year: "2024 - 2025",
    originalImage: "/images/projects/landing-page-works.jpg",
    externalUrl: "https://www.youtube.com/watch?v=BpOYC8AsUpE",
    layoutVariant: "videoHero",
    youtubeId: "BpOYC8AsUpE",
  },
  {
    id: "circles",
    title: "Circles",
    subtitle: "Finance AI Landing page. Featured by Muz.li.",
    year: "2026",
    originalImage: "/images/projects/circles.png",
    externalUrl:
      "https://medium.muz.li/crafting-circles-designing-and-building-a-fintech-landing-page-in-framer-165d23bfa922",
    layoutVariant: "featuredWide",
  },
  {
    id: "veridoc",
    title: "Veridoc",
    subtitle: "Legal AI Landing page. Built with Cursor",
    year: "2026",
    originalImage: "/images/projects/veridoc.png",
    externalUrl: "https://veridoc-ai.netlify.app/",
    layoutVariant: "featuredWide",
  },
  {
    id: "calodrop",
    title: "Calodrop",
    subtitle: "iOS App Design",
    year: "2026",
    originalImage: "/images/projects/calodrop.png",
    mobileImage: "/images/projects/calodrop.png",
    layoutVariant: "twoUp",
    pairWith: "charity-app",
    hideOnMobile: true,
    mediaObjectPosition: ["right", "bottom"],
  },
  {
    id: "charity-app",
    title: "Charity App",
    subtitle: "iOS App design",
    year: "2024",
    originalImage: "/images/projects/charity.png",
    mobileImage: "/images/projects/charity.png",
    externalUrl: "https://www.behance.net/iqbaldesign",
    layoutVariant: "deviceMockup",
    hideOnMobile: true,
  },
  {
    id: "chainly",
    title: "Chainly",
    subtitle: "Web3 Landing page template",
    year: "2026",
    originalImage: "/images/projects/chainly.png",
    externalUrl: "https://templates-chainly.framer.website/",
    layoutVariant: "featuredWide",
  },
  {
    id: "aimon",
    title: "AIMON",
    subtitle: "Habit tracker apps",
    year: "2024",
    originalImage: "/images/projects/aimon-mobile.png",
    mobileImage: "/images/projects/aimon-mobile.png",
    externalUrl: "https://www.behance.net/iqbaldesign",
    layoutVariant: "twoUp",
    pairWith: "velocity",
    hideOnMobile: true,
  },
  {
    id: "velocity",
    title: "Velocity",
    subtitle: "iOS App Design",
    year: "2025",
    originalImage: "/images/projects/velocity.png",
    mobileImage: "/images/projects/velocity.png",
    externalUrl: "https://www.behance.net/iqbaldesign",
    layoutVariant: "deviceMockup",
    hideOnMobile: true,
  },
  {
    id: "senior-cares",
    title: "Senior Cares",
    subtitle: "Work Case Study",
    year: "2025",
    coverImage: "/images/projects/senior-cares.png",
    originalImage: "/images/projects/senior-cares.png",
    externalUrl:
      "https://medium.com/@iqbalaqaba/ux-study-case-visual-refreshment-of-senior-care-website-61707ad2c3bd",
    layoutVariant: "editorial",
  },
  {
    id: "appreal",
    title: "Appreal",
    subtitle: "Web3 Dashboard design",
    year: "2025",
    originalImage: "/images/projects/appreal.png",
    layoutVariant: "featuredWide",
    mediaFit: "contain",
    mediaObjectPosition: "center",
    mediaInsetTop: 40,
    mediaInsetBottom: 40,
  },
  {
    id: "housefresh",
    title: "Housefresh",
    subtitle: "Review blog redesign",
    year: "2024",
    originalImage: "/images/projects/housefresh.png",
    externalUrl: "https://housefresh.com/",
    layoutVariant: "featuredWide",
  },
  {
    id: "phoenix",
    title: "Phoenix",
    subtitle: "AI property appraisal",
    year: "2024",
    coverImage: "/images/projects/extra-2.png",
    originalImage: "/images/projects/phoenix.png",
    externalUrl: "https://www.phoenixsoftware.io/real-estate-crm/",
    layoutVariant: "editorial",
  },
  {
    id: "traction-energy-asia",
    title: "Traction Energy Asia",
    subtitle: "Company profile redesign",
    year: "2025",
    originalImage: "/images/projects/traction.png",
    externalUrl: "https://interactive-tour-821839.framer.app/",
    layoutVariant: "featuredWide",
  },
  {
    id: "hireamaid",
    title: "HireAMaid",
    subtitle: "Company profile design",
    year: "2026",
    originalImage: "/images/projects/hireamaid.png",
    externalUrl: "https://www.hireamaid.sg/",
    layoutVariant: "featuredWide",
  },
];

const pairedPartnerIds = new Set(
  projects
    .filter((p) => p.layoutVariant === "twoUp" && p.pairWith)
    .map((p) => p.pairWith!),
);

export function getRenderableProjects(): Project[] {
  return projects.filter((p) => !p.hidden && !pairedPartnerIds.has(p.id));
}

export function getProjectById(id: string): Project | undefined {
  const project = projects.find((p) => p.id === id);
  if (!project || project.hidden) return undefined;
  return project;
}
