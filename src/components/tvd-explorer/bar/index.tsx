"use client";

import * as React from "react";
import * as d3 from "d3";

import useTransition from "../hooks/useTransition";

interface IBarProps {
  data: {
    name: string;
    transistors: number;
    designer: string;
  };
  y: number;
  width: number;
  thickness: number;
  endLabel: string;
  formatter: (value: number) => string;
  color: string;
}

export default function Bar({
  data,
  y,
  width,
  thickness,
  endLabel,
  formatter,
  color,
}: IBarProps) {
  const renderWidth = useTransition({
    targetValue: width,
    name: `width-${data.name}`,
    easing: data.designer === "Moore" ? d3.easeLinear : d3.easeCubicInOut,
  });
  const renderY = useTransition({
    targetValue: y,
    name: `y-${data.name}`,
    startValue: -500 + Math.random() * 200,
    easing: d3.easeCubicInOut,
  });
  const renderX = useTransition({
    targetValue: 0,
    name: `x-${data.name}`,
    startValue: 1000 + Math.random() * 200,
    easing: d3.easeCubicInOut,
  });
  const transistors = useTransition({
    targetValue: data.transistors,
    name: `trans-${data.name}`,
    easing: d3.easeLinear,
  });

  return (
    <g transform={`translate(${renderX}, ${renderY})`}>
      <rect x={0} y={0} width={renderWidth} height={thickness} fill={color} />
      <text
        className="font-sans text-sm fill-black"
        style={{ alignmentBaseline: "middle", textAnchor: "start" }}
        x={10}
        y={thickness / 2}
      >
        {data.name}
      </text>
      <text
        className="font-sans text-sm fill-black"
        style={{ alignmentBaseline: "middle", textAnchor: "start" }}
        y={thickness / 2}
        x={renderWidth + 15}
      >
        {data.designer === "Moore"
          ? formatter(Math.round(transistors))
          : formatter(data.transistors)}
      </text>
    </g>
  );
}
