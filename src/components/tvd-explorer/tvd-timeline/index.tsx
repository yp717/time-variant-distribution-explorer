import * as React from "react";
import * as d3 from "d3";

import { useVis } from "../vis-context";

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
  const svgRef = React.useRef<SVGSVGElement>(null);
  const { svgDimensions } = useVis();
  const { width, height } = svgDimensions as DOMRect;

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

  return (
    <div className="h-[75px] py-2 border-t border-neutral-200">
      <svg ref={svgRef} width={width} height={height} onClick={handleClick}>
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
                height={74}
                fill={isBehind ? "red" : "green"}
                opacity={yearNumber <= currentYear ? 1 : 0.5}
              />
            );
          })}
          <g>
            <line
              x1={currentYearPosition}
              y1={0}
              x2={currentYearPosition}
              y2={74}
              stroke="black"
              strokeWidth={2}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
