import Header from "@/components/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import WelcomeBlock from "@/components/dashboard/WelcomeBlock";
import StatsRow from "@/components/dashboard/StatsRow";
import TopicsAndPreview from "@/components/dashboard/TopicsAndPreview";
import CurrentModule from "@/components/dashboard/CurrentModule";
import RecentResults from "@/components/dashboard/RecentResults";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Header */}
      <Header mode="dashboard" />

      {/* Body: sidebar + main */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* Main scrollable content */}
        <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
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
    </div>
  );
}
