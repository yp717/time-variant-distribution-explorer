"use client";

import * as React from "react";
import * as d3 from "d3";

import { VisProvider } from "./vis-context";
import TVDTimeline from "./tvd-timeline";
import NoSSR from "./no-ssr";
import VerticalGrid from "./VerticalGrid";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import useData from "./hooks/useData";
import mooresLaw from "./helpers/mooresLaw";
import BarChart from "./bar-chart";
import TVDMenu from "./tvd-menu";
import TVDFilter from "./tvd-header/filter";

/**
 * Time Varying Distribution Explorer component inspired by video players and bar chart animations.
 *
 * @returns {JSX.Element} TVD Explorer component.
 */
export default function TVDExplorer() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const data = useData();
  const [filteredData, setFilteredData] = React.useState<any>(data);
  const [typeFilter, setTypeFilter] = React.useState<"All" | "CPU" | "GPU">(
    "All"
  );
  const [designerFilter, setDesignerFilter] = React.useState<string>("All");

  const dimensions = useResizeObserver(svgRef);
  const [paused, setPaused] = React.useState(false);

  const mooresLawData = React.useMemo(() => mooresLaw(), []);
  const [currentYear, setCurrentYear] = React.useState(1970);

  // Drives the main animation loop progressing through the years
  React.useEffect(() => {
    if (paused) {
      return;
    }

    const interval = d3.interval(() => {
      setCurrentYear((year) => {
        if (year >= 2019 || !data || !data[year + 1]) {
          interval.stop();
          return year;
        }

        return year + 1;
      });
    }, 2000);

    return () => interval.stop();
  }, [data, paused]);

  // Update filtered data when filters change
  React.useEffect(() => {
    if (data) {
      const filtered = Object.entries(data).reduce((acc, [year, entries]) => {
        const filteredEntries = entries.filter(
          (item) =>
            (typeFilter === "All" || item.type === typeFilter) &&
            (designerFilter === "All" || item.designer === designerFilter)
        );
        acc[year] = filteredEntries;
        return acc;
      }, {} as typeof data);
      setFilteredData(filtered);
    }
  }, [data, typeFilter, designerFilter]);

  const designerOptions = [
    "All",
    ...Array.from(
      new Set(
        Object.values(data ?? {})
          .flat()
          .map((d) => d.designer)
      )
    ),
  ]
    .filter((d) => d)
    .sort();

  return (
    <NoSSR
      fallback={
        <div className="w-full px-6 py-6 mx-auto text-gray-900 bg-white h-full flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <div className="aspect-video w-full h-full" ref={containerRef}>
        <div className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 flex items-center justify-between">
          <div className="flex gap-4">
            <TVDFilter
              label="Filter by Type"
              options={["All", "CPU", "GPU"]}
              value={typeFilter}
              onChange={(value) =>
                setTypeFilter(value as "All" | "CPU" | "GPU")
              }
            />
            <TVDFilter
              label="Filter by Designer"
              options={designerOptions}
              value={designerFilter}
              onChange={(value) => setDesignerFilter(value)}
            />
          </div>
        </div>

        <VisProvider svgRef={svgRef} containerRef={containerRef}>
          <svg
            className="w-full h-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
            height={dimensions.height}
            width={dimensions.width}
            ref={svgRef}
          >
            <VerticalGrid />
            <BarChart
              data={[
                ...((filteredData &&
                  filteredData[currentYear]?.filter(
                    (item) =>
                      designerFilter === "All" ||
                      item.designer === designerFilter
                  )) ||
                  []),
                {
                  name: "Moore's law",
                  designer: "Moore",
                  year: currentYear,
                  type: "",
                  transistors: mooresLawData[currentYear],
                },
              ]}
              barThickness={30}
            />
          </svg>

          <TVDTimeline
            data={data as any}
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            mooresLawData={mooresLawData}
          />

          <TVDMenu
            paused={paused}
            setPaused={setPaused}
            currentYear={currentYear}
          />
        </VisProvider>
      </div>
    </NoSSR>
  );
}
