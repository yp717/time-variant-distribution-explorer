"use client";

import * as React from "react";
import { VisProvider } from "./vis-context";
import TVDTimeline from "./tvd-timeline";
import NoSSR from "./no-ssr";
import VerticalGrid from "./VerticalGrid";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import useData from "./hooks/useData";
import mooresLaw from "./helpers/mooresLaw";
import BarChart from "./bar-chart";
import TVDMenu from "./tvd-menu";
import { TVDFilters } from "./tvd-header/filters";
import { useAnimationLoop } from "./hooks/useAnimationLoop";
import { useFilteredData } from "./hooks/useFilteredData";

/**
 * Time Varying Distribution Explorer component inspired by video players and bar chart animations.
 *
 * @returns {JSX.Element} TVD Explorer component.
 */
export default function TVDExplorer() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const data = useData();
  const [typeFilter, setTypeFilter] = React.useState<"All" | "CPU" | "GPU">(
    "All"
  );
  const [designerFilter, setDesignerFilter] = React.useState<string>("All");

  const filteredData = useFilteredData(data, typeFilter, designerFilter);

  const dimensions = useResizeObserver(svgRef);
  const [paused, setPaused] = React.useState(false);

  const mooresLawData = React.useMemo(() => mooresLaw(), []);
  const [currentYear, setCurrentYear] = React.useState(1970);

  useAnimationLoop(data, paused, setCurrentYear);

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
        <TVDFilters
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          designerFilter={designerFilter}
          setDesignerFilter={setDesignerFilter}
          designerOptions={designerOptions}
        />

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
                    (item: {
                      name: string;
                      designer: string;
                      year: number;
                      type: string;
                      transistors: number;
                    }) =>
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
