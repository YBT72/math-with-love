import Header from "../../components/shell/Header";
import ThemeShell from "../../components/shell/ThemeShell";
import StudentSidebar from "../../components/shell/StudentSidebar";
import BottomNav from "../../components/shell/BottomNav";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeShell>
      <Header />
      <div className="body">
        <StudentSidebar />
        <main className="main shell-main">
          {children}
        </main>
      </div>
      <BottomNav />
    </ThemeShell>
  );
}
