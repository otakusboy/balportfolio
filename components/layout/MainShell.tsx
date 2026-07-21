import type { ReactNode } from "react";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";

type Props = {
  children: ReactNode;
};

export function MainShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] lg:h-screen lg:overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col lg:flex-row">
        <aside
          className="w-full shrink-0 bg-[var(--bg-sidebar)] lg:h-full lg:w-[500px] lg:overflow-y-auto"
          aria-label="Profile"
        >
          <ProfileSidebar />
        </aside>

        <main
          className="flex min-h-0 flex-1 flex-col bg-white px-4 pb-6 pt-4 lg:h-full lg:px-0 lg:pb-0 lg:pt-0 lg:pl-5"
          aria-label="Portfolio"
        >
          <div className="flex min-h-0 flex-1 flex-col lg:m-4">
            <div className="portfolio-scroll min-h-0 flex-1 overflow-y-auto lg:rounded-[5px] lg:border lg:border-[var(--border-subtle)] lg:bg-[#f8f9fc] lg:p-5">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
