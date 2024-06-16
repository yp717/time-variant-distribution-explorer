"use client";

import * as React from "react";

/**
 * Time Varying Distribution Explorer component inspired by video players and bar chart animations.
 *
 * @returns {JSX.Element} TVD Explorer component.
 */
export default function TVDExplorer() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  return (
    <div
      className="w-full h-full bg-neutral-50 dark:bg-neutral-950"
      ref={containerRef}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
}
