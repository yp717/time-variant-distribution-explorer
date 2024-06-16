import DarkModeToggle from "@/components/darkmode-toggle";
import Header from "@/components/header";
import TVDExplorer from "@/components/tvd-explorer";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center gap-6 px-6 lg:px-32 py-6 lg:py-16">
      <Header />
      <TVDExplorer />
    </main>
  );
}
