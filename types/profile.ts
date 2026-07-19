export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

export type BrandLogo = {
  id: string;
  name: string;
  src: string;
};

export type ProfileData = {
  name: string;
  greeting: string;
  bio: string;
  email: string;
  avatar: string;
  badge?: string;
  socials: SocialLink[];
  brands: BrandLogo[];
  brandsLabel: string;
};
