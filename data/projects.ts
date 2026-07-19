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
 * Media options:
 *   posterImage, mediaGradient, hidden
 */
export const projects: Project[] = [
  {
    id: "landing-page-works",
    title: "Landing page works",
    subtitle: "UI/UX Design & Redesign",
    year: "2024 - 2025",
    coverImage: "/images/projects/landing-page-works.jpg",
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
    externalUrl: "https://www.youtube.com/watch?v=BpOYC8AsUpE",
    layoutVariant: "videoHero",
    youtubeId: "BpOYC8AsUpE",
  },
  {
    id: "circles",
    title: "Circles",
    subtitle: "Finance AI Landing page. Featured by Muz.li.",
    year: "2026",
    coverImage: "/images/projects/circles.png",
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
    externalUrl:
      "https://medium.muz.li/crafting-circles-designing-and-building-a-fintech-landing-page-in-framer-165d23bfa922",
    layoutVariant: "featuredWide",
  },
  {
    id: "veridoc",
    title: "Veridoc",
    subtitle: "Legal AI Landing page. Built with Cursor",
    year: "2026",
    coverImage: "/images/projects/veridoc.png",
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
    externalUrl: "https://veridoc-ai.netlify.app/",
    layoutVariant: "featuredWide",
  },
  {
    id: "calodrop",
    title: "Calodrop",
    subtitle: "iOS App Design",
    year: "2026",
    coverImage: "/images/projects/calodrop.png",
    mobileImage: "/images/projects/calodrop.png",
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
    externalUrl: "https://www.behance.net/iqbaldesign",
    layoutVariant: "twoUp",
    pairWith: "charity-app",
  },
  {
    id: "charity-app",
    title: "Charity App",
    subtitle: "iOS App design",
    year: "2024",
    coverImage: "/images/projects/charity.png",
    mobileImage: "/images/projects/charity.png",
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
    externalUrl: "https://www.behance.net/iqbaldesign",
    layoutVariant: "deviceMockup",
  },
  {
    id: "chainly",
    title: "Chainly",
    subtitle: "Web3 Landing page template",
    year: "2026",
    coverImage: "/images/projects/chainly.png",
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
    externalUrl: "https://templates-chainly.framer.website/",
    layoutVariant: "featuredWide",
  },
  {
    id: "aimon",
    title: "AIMON",
    subtitle: "Habbit tracker apps",
    year: "2024",
    coverImage: "/images/projects/aimon-mobile.png",
    mobileImage: "/images/projects/aimon-mobile.png",
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
    externalUrl: "https://www.behance.net/iqbaldesign",
    layoutVariant: "twoUp",
    pairWith: "velocity",
  },
  {
    id: "velocity",
    title: "Velocity",
    subtitle: "iOS App Design",
    year: "2025",
    coverImage: "/images/projects/velocity.png",
    mobileImage: "/images/projects/velocity.png",
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
    externalUrl: "https://www.behance.net/iqbaldesign",
    layoutVariant: "deviceMockup",
  },
  {
    id: "senior-cares",
    title: "Senior Cares",
    subtitle: "Work Case Study",
    year: "2025",
    coverImage: "/images/projects/senior-cares.png",
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
    externalUrl:
      "https://medium.com/@iqbalaqaba/ux-study-case-visual-refreshment-of-senior-care-website-61707ad2c3bd",
    layoutVariant: "editorial",
  },
  {
    id: "appreal",
    title: "Appreal",
    subtitle: "Web3 Dashboard design",
    year: "2025",
    coverImage: "/images/projects/appreal.png",
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
    externalUrl: "https://www.behance.net/iqbaldesign",
    layoutVariant: "featuredWide",
  },
  {
    id: "housefresh",
    title: "Housefresh",
    subtitle: "Review blog redesign",
    year: "2024",
    coverImage: "/images/projects/housefresh.png",
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
    externalUrl: "https://housefresh.com/",
    layoutVariant: "featuredWide",
  },
  {
    id: "phoenix",
    title: "Phoenix",
    subtitle: "AI property appraisal",
    year: "2024",
    coverImage: "/images/projects/phoenix.png",
    gallery: [
      "/images/projects/phoenix-tablet.png",
      "/images/projects/extra-2.png",
    ],
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
    externalUrl: "https://www.phoenixsoftware.io/real-estate-crm/",
    layoutVariant: "editorial",
  },
  {
    id: "traction-energy-asia",
    title: "Traction Energy Asia",
    subtitle: "Company profile redesign",
    year: "2025",
    coverImage: "/images/projects/traction.png",
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
    externalUrl: "https://interactive-tour-821839.framer.app/",
    layoutVariant: "featuredWide",
  },
  {
    id: "hireamaid",
    title: "HireAMaid",
    subtitle: "Company profile design",
    year: "2026",
    coverImage: "/images/projects/hireamaid.png",
    mediaInsetLeft: 20,
    mediaInsetRight: 20,
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
