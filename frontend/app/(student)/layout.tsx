import Header from "../../components/shell/Header";
import ThemeShell from "../../components/shell/ThemeShell";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeShell>
      <Header />
      <div className="body">
        <main className="main">
          {children}
        </main>
      </div>
    </ThemeShell>
  );
}
