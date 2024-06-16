"use client";

import * as React from "react";
import * as d3 from "d3";

import useChipDesignerColors from "../hooks/useChipDesignerColors";
import Bar from "../bar";
import { useVis } from "../vis-context";

interface IBarChartProps {
  data: { name: string; designer: string; transistors: number }[];
  barThickness: number;
}

// Draws the barchart for a single year
export default function BarChart({ data, barThickness }: IBarChartProps) {
  const { svgDimensions } = useVis();
  const { width } = svgDimensions as DOMRect;

  const chipDesignerColor = useChipDesignerColors();

  // not worth memoizing this since data changes every year
  const xDomain = [0, d3.max(data, (d) => d.transistors)] as [number, number];
  const xScale = d3
    .scaleLinear()
    .domain(xDomain)
    .range([0, width * 0.8]);

  const yScale = React.useMemo(
    () =>
      d3
        .scaleBand()
        .domain(d3.range(0, data.length))
        .paddingInner(0.2)
        .range([data.length * barThickness, 0]),
    [data.length, barThickness]
  );

  const formatter = xScale.tickFormat();

  return (
    <g transform={`translate(${0}, ${0})`}>
      {data
        .sort((a, b) => a.transistors - b.transistors)
        .map((d, index) => (
          <Bar
            data={d}
            key={d.name}
            y={yScale(index)}
            width={xScale(d.transistors)}
            endLabel={formatter(d.transistors)}
            thickness={yScale.bandwidth()}
            formatter={formatter}
            color={chipDesignerColor(d.designer) || "black"}
          />
        ))}
    </g>
  );
}
