import Image from "next/image";
import { BrandMarquee } from "@/components/layout/BrandMarquee";
import { profile } from "@/data/profile";

export function ProfileSidebar() {
  return (
    <div className="flex h-full w-full flex-col justify-end px-5 pb-6 pt-5 max-[399px]:px-4 lg:max-w-[500px] lg:px-6 lg:pb-6 lg:pt-6">
      <div className="flex flex-col gap-8">
        <div className="relative h-14 w-14">
          <Image
            src={profile.avatar}
            alt={`${profile.name} portrait`}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
            priority
          />
          {profile.badge ? (
            <Image
              src={profile.badge}
              alt="Top Rated talent badge"
              width={22}
              height={22}
              className="absolute -bottom-0.5 -right-0.5 h-[22px] w-[22px]"
            />
          ) : null}
        </div>

        <div>
          <h1 className="text-[18px] font-semibold leading-[1.25] tracking-[-0.01em] text-[var(--text)]">
            {profile.greeting}
          </h1>

          <p className="mt-3 text-balance text-[14px] leading-[1.55] text-[var(--text-secondary)]">
            {profile.bio}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-10 items-center justify-center rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-4 text-[14px] font-semibold text-[var(--text-button)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
            >
              Contact me
            </a>

            <ul className="flex items-center gap-2" aria-label="Social links">
              {profile.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 overflow-hidden rounded-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 object-cover"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <BrandMarquee brands={profile.brands} label={profile.brandsLabel} />
      </div>
    </div>
  );
}
