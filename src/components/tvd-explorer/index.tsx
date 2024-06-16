"use client";

import * as React from "react";
import * as d3 from "d3";

import { Pause, PlayIcon } from "lucide-react";

import { VisProvider } from "./vis-context";
import TVDHeader from "./tvd-header";
import TVDTimeline from "./tvd-timeline";
import NoSSR from "./no-ssr";
import VerticalGrid from "./VerticalGrid";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import useData from "./hooks/useData";
import mooresLaw from "./helpers/mooresLaw";
import BarChart from "./bar-chart";

/**
 * Time Varying Distribution Explorer component inspired by video players and bar chart animations.
 *
 * @returns {JSX.Element} TVD Explorer component.
 */
export default function TVDExplorer() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const [typeFilter, setTypeFilter] = React.useState<"all" | "CPU" | "GPU">(
    "all"
  );
  const [designerFilter, setDesignerFilter] = React.useState<string>("all");

  const dimensions = useResizeObserver(containerRef);
  const [paused, setPaused] = React.useState(false);
  const data = useData(typeFilter);
  const mooresLawData = React.useMemo(() => mooresLaw(), []);
  const [currentYear, setCurrentYear] = React.useState(1970);

  // Drives the main animation loop progressing through the years
  React.useEffect(() => {
    if (paused) {
      return;
    }

    const interval = d3.interval(() => {
      setCurrentYear((year) => {
        if (!data || !data[year + 1]) {
          interval.stop();
        }

        return year + 1;
      });

      if (currentYear >= 2024) {
        interval.stop();
      }
    }, 2000);

    return () => interval.stop();
  }, [data, paused, currentYear]);

  const designerOptions = [
    "all",
    ...Array.from(
      new Set(
        Object.values(data ?? {})
          .flat()
          .map((d) => d.designer)
      )
    ),
  ];

  const xScale = d3
    .scaleLinear()
    .domain([1970, 2024])
    .range([0, dimensions.width]);

  return (
    <NoSSR
      fallback={
        <div className="w-full px-6 py-6 mx-auto text-gray-900 bg-white h-[600px] flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <div
        className="w-full h-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
        ref={containerRef}
      >
        <TVDHeader />
        <button
          className="text-gray-100 bg-white border cursor-pointer"
          onClick={() => setPaused(!paused)}
        >
          {paused ? (
            <PlayIcon className="w-6 h-6" />
          ) : (
            <Pause className="w-6 h-6" />
          )}
        </button>
        <VisProvider svgRef={svgRef} containerRef={containerRef}>
          <svg
            className="w-full h-[600px]"
            height={600}
            width={dimensions.width}
            ref={svgRef}
          >
            <VerticalGrid />
            <BarChart
              data={[
                ...((data &&
                  data[currentYear]?.filter(
                    (item) =>
                      designerFilter === "all" ||
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
            <text
              className="font-sans text-6xl font-bold fill-neutral-900 dark:fill-neutral-100"
              style={{ textAnchor: "end" }}
              x={"100%"}
              y={"100%"}
            >
              {currentYear}
            </text>
          </svg>
          {data && data[currentYear] && (
            <TVDTimeline
              data={data}
              currentYear={currentYear}
              setCurrentYear={setCurrentYear}
              mooresLawData={mooresLawData}
            />
          )}
        </VisProvider>
      </div>
    </NoSSR>
  );
}
