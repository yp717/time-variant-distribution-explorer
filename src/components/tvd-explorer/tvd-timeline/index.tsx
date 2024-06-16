import * as React from "react";
import * as d3 from "d3";

import { useResizeObserver } from "@/hooks/useResizeObserver";

interface ITimelineProps {
  data: {
    name: string;
    designer: string;
    year: number;
    transistors: number;
    type: string;
  }[][];
  currentYear: number;
  setCurrentYear: (year: number) => void;
  mooresLawData: Record<number, number>;
}

export default function TVDTimeline({
  data,
  currentYear,
  setCurrentYear,
  mooresLawData,
}: ITimelineProps) {
  const [hovered, setHovered] = React.useState<boolean | null>(null);

  const svgRef = React.useRef<SVGSVGElement>(null);
  const dimensions = useResizeObserver(svgRef);
  const { width, height } = dimensions;

  const transistorsByYear = Object.entries(data).reduce(
    (acc, [year, entries]) => {
      const maxInYear = entries.reduce(
        (max, item) => Math.max(max, item.transistors),
        0
      );
      acc[year] = maxInYear;
      return acc;
    },
    {} as Record<string, number>
  );

  const xDomain = [1970, 2024];
  const xRange = [0, width];

  const xScale = d3.scaleLinear().domain(xDomain).range(xRange);

  const currentYearPosition = xScale(currentYear);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect.left;
      const year = Math.round(xScale.invert(x));
      setCurrentYear(year);
    }
  };

  const handleHover = (event: React.MouseEvent<SVGSVGElement>) => {
    setHovered(true);
  };

  return (
    <div className="border-t border-neutral-200">
      <svg
        ref={svgRef}
        width={width}
        height={10}
        className="w-full h-full overflow-visible"
        onClick={handleClick}
        onMouseOver={handleHover}
        onMouseLeave={() => setHovered(false)}
      >
        <g>
          {Object.keys(mooresLawData).map((year, index) => {
            const yearNumber = Number(year);
            const isBehind =
              transistorsByYear[year] < mooresLawData[yearNumber];
            return (
              <rect
                key={yearNumber}
                x={xScale(yearNumber)}
                y={0}
                width={width / (xDomain[1] - xDomain[0])}
                height={9}
                fill={isBehind ? "red" : "green"}
                opacity={yearNumber <= currentYear ? 1 : 0.5}
              />
            );
          })}
          <g>
            {hovered ? (
              <circle
                cx={currentYearPosition}
                cy={4.5}
                r={8}
                className="stroke-neutral-700 fill-neutral-700"
                fill="currentColor"
              />
            ) : (
              <line
                x1={currentYearPosition}
                y1={0}
                x2={currentYearPosition}
                y2={9}
                className="stroke-neutral-700"
                stroke="currentColor"
                strokeWidth={2}
              />
            )}
          </g>
        </g>
      </svg>
    </div>
  );
}
