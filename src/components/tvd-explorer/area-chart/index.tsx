import * as React from "react";
import * as d3 from "d3";

import { useResizeObserver } from "@/hooks/useResizeObserver";
import { useVis } from "../vis-context";

interface IAreaChartProps {
  data: {
    name: string;
    designer: string;
    year: number;
    transistors: number;
    type: string;
  }[][];
  mooresLawData: Record<number, number>;
}

export default function AreaChart({ data, mooresLawData }: IAreaChartProps) {
  const { svgDimensions } = useVis();
  return null;
  const { width, height } = svgDimensions;

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

  const differences = Object.entries(transistorsByYear).map(
    ([year, transistors]) => ({
      year: parseInt(year, 10),
      difference: transistors - (mooresLawData[parseInt(year, 10)] || 0),
    })
  );

  const xScale = d3.scaleLinear().domain([1970, 2019]).range([0, width]);
  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(differences, (d) => d.difference),
      d3.max(differences, (d) => d.difference),
    ])
    .range([height, 0]);

  const areaGenerator = d3
    .area<{ year: number; difference: number }>()
    .x((d) => xScale(d.year))
    .y0(yScale(0))
    .y1((d) => yScale(d.difference))
    .curve(d3.curveMonotoneX);

  return (
    <g>
      <path
        d={areaGenerator(differences) || undefined}
        fill="steelblue"
        opacity={0.7}
      />
    </g>
  );
}
