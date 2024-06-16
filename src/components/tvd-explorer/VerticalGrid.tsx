import * as React from "react";
import * as d3 from "d3";

import { useVis } from "./vis-context";

const VerticalGrid = () => {
  const { svgDimensions } = useVis();
  // TODO: remove type assertion
  const { width, height } = svgDimensions as DOMRect;

  const xScale = d3.scaleLinear().domain([1970, 2024]).range([0, width]);
  const ticks = xScale.ticks();

  return (
    <g className="vertical-grid">
      {ticks.map((tick) => (
        <line
          key={tick}
          x1={xScale(tick)}
          y1={0}
          x2={xScale(tick)}
          y2={height}
          stroke="lightgray"
          strokeWidth={1}
        />
      ))}
    </g>
  );
};

export default VerticalGrid;
