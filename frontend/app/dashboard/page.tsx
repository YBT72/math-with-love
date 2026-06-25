import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import BottomNav from "@/components/dashboard/BottomNav";
import WelcomeBlock from "@/components/dashboard/WelcomeBlock";
import StatsRow from "@/components/dashboard/StatsRow";
import TopicsAndPreview from "@/components/dashboard/TopicsAndPreview";
import CurrentModule from "@/components/dashboard/CurrentModule";
import RecentResults from "@/components/dashboard/RecentResults";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Header */}
      <DashboardHeader />

      {/* Body: sidebar + main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: hidden on mobile, visible md+ */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main scrollable content */}
        <main className="flex-1 overflow-y-auto p-4 pb-[calc(1rem+52px+env(safe-area-inset-bottom))] md:pb-4 flex flex-col gap-3">
          {/* Welcome + Yosi */}
          <WelcomeBlock />

          {/* Stats */}
          <StatsRow />

          {/* Topics list + preview panel */}
          <TopicsAndPreview />

          {/* Current module + Recent results */}
          <div className="grid grid-cols-2 gap-3">
            <CurrentModule />
            <RecentResults />
          </div>
        </main>
      </div>

      {/* Bottom navigation: mobile only */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
