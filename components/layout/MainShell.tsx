import type { ReactNode } from "react";
import { BackToTop } from "@/components/layout/BackToTop";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";

type Props = {
  children: ReactNode;
};

export function MainShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] min-[1301px]:h-screen min-[1301px]:overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col min-[1301px]:flex-row">
        <aside
          className="w-full shrink-0 bg-[var(--bg-sidebar)] min-[1301px]:h-full min-[1301px]:w-[500px] min-[1301px]:overflow-y-auto"
          aria-label="Profile"
        >
          <ProfileSidebar />
        </aside>

        <main
          className="flex min-h-0 flex-1 flex-col bg-white pb-6 pt-4 min-[1301px]:h-full min-[1301px]:pb-0 min-[1301px]:pt-0 min-[1301px]:pl-5"
          aria-label="Portfolio"
        >
          <div className="flex min-h-0 flex-1 flex-col min-[1301px]:m-4">
            <div className="portfolio-scroll min-h-0 flex-1 overflow-y-auto p-8 min-[1301px]:rounded-[5px] min-[1301px]:border min-[1301px]:border-[var(--border-subtle)] min-[1301px]:bg-[#f8f9fc]">
              {children}
            </div>
          </div>
        </main>
      </div>
      <BackToTop />
    </div>
  );
}
