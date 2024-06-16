import Header from "@/components/header";
import TVDExplorer from "@/components/tvd-explorer";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center gap-6 px-6 lg:px-32 py-6 lg:py-16 mb-32">
      <Header />
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
          Moore&apos;s Law
        </h1>
        <p className="text-sm text-neutral-800 dark:text-neutral-400">
          Moore&apos;s law is the observation that the number of transistors in
          a dense integrated circuit doubles about every two years. The
          observation is named after Gordon Moore, the co-founder of Fairchild
          Semiconductor and Intel, whose 1965 paper described a doubling every
          year in the number of components per integrated circuit, and projected
          this rate of growth would continue for at least another decade. In
          1975, looking forward to the next decade, he revised the forecast to
          doubling every two years. The period is often quoted as 18 months
          because of Intel executive David House, who predicted that chip
          performance would double every 18 months (being a combination of the
          effect of more transistors and their being faster).
        </p>
      </div>
      <TVDExplorer />
    </main>
  );
}
