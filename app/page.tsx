import { MainShell } from "@/components/layout/MainShell";
import { PortfolioList } from "@/components/portfolio/PortfolioList";

export default function HomePage() {
  return (
    <MainShell>
      <PortfolioList />
    </MainShell>
  );
}
