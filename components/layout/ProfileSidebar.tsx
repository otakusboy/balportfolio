import Image from "next/image";
import { BrandMarquee } from "@/components/layout/BrandMarquee";
import { profile } from "@/data/profile";
import { getBrandLogos } from "@/lib/brand-logos";
import { IMAGE_QUALITY } from "@/lib/image";

export function ProfileSidebar() {
  const brands = getBrandLogos();
  return (
    <div className="flex h-full w-full flex-col px-5 pb-6 pt-5 max-[399px]:px-4 min-[1301px]:max-w-[500px] min-[1301px]:justify-end min-[1301px]:px-6 min-[1301px]:pb-6 min-[1301px]:pt-6">
      <div className="flex flex-col gap-8">
        <div>
          <div className="relative h-14 w-14">
            <Image
              src={profile.avatar}
              alt={`${profile.name} portrait`}
              width={56}
              height={56}
              quality={IMAGE_QUALITY}
              className="h-14 w-14 rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
              priority
            />
            {profile.badge ? (
              <Image
                src={profile.badge}
                alt="Top Rated talent badge"
                width={22}
                height={22}
                quality={IMAGE_QUALITY}
                className="absolute -bottom-0.5 -right-0.5 h-[22px] w-[22px]"
              />
            ) : null}
          </div>

          <h1 className="mt-4 text-[18px] font-semibold leading-[1.25] tracking-[-0.01em] text-[var(--text)]">
            {profile.greeting}
          </h1>

          <p className="mt-3 text-balance text-[14px] leading-[1.55] text-[var(--text-secondary)]">
            {profile.bio}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="btn-contact inline-flex h-10 items-center justify-center rounded-[8px] bg-[var(--surface)] px-[14px] text-[14px] font-semibold leading-none text-[var(--text-button)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
            >
              Contact me
            </a>

            <ul
              className="m-0 flex h-10 list-none items-center gap-3 p-0"
              aria-label="Social links"
            >
              {profile.socials.map((social) => (
                <li key={social.id} className="flex items-center">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-[30px] w-[30px] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={30}
                      height={30}
                      quality={IMAGE_QUALITY}
                      className="h-[30px] w-[30px] object-cover"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <BrandMarquee brands={brands} label={profile.brandsLabel} />
      </div>
    </div>
  );
}
