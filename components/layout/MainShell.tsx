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
          className="w-full shrink-0 bg-[var(--bg-sidebar)] lg:h-full lg:w-[40%] lg:overflow-y-auto"
          aria-label="Profile"
        >
          <ProfileSidebar />
        </aside>

        <main className="flex min-h-0 flex-1 flex-col bg-white lg:h-full" aria-label="Portfolio">
          <div className="m-4 flex min-h-0 flex-1 flex-col">
            <div className="portfolio-scroll min-h-0 flex-1 overflow-y-auto rounded-[5px] border border-[var(--border-subtle)] p-4">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
