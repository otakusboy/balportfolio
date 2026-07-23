import type { ProfileData } from "@/types/profile";

export const profile: ProfileData = {
  name: "Iqbal Aqaba",
  greeting: "Hello, I’m Iqbal 👋",
  bio: "UI/UX designer with 8+ years of experience crafting mobile apps, websites, and conversion-driven interfaces. Specialized in Framer development for fast, clean, and scalable results.",
  email: "work@iqbalaqaba.com",

  avatar: "/images/profile/avatar.jpg",
  badge: "/images/profile/top-talent-badge.png",

  /** Marquee logos load from `/public/images/brands/{number}.svg` — see `lib/brand-logos.ts` */
  brandsLabel: "Trusted by Leading Brands",

  socials: [
    {
      id: "upwork",
      label: "Upwork",
      href: "https://upwork.com/fl/iqbalaqaba",
      icon: "/images/social/upwork.png",
    },
    {
      id: "behance",
      label: "Behance",
      href: "https://www.behance.net/iqbaldesign",
      icon: "/images/social/behance.png",
    },
    {
      id: "x",
      label: "X",
      href: "https://x.com/balaqaba",
      icon: "/images/social/x.png",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/iqbalaqaba/",
      icon: "/images/social/linkedin.png",
    },
  ],
};
