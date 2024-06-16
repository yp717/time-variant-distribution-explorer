"use client";

import * as React from "react";
import * as d3 from "d3";

interface IUseTransitionProps {
  targetValue: number;
  name: string;
  startValue?: number;
  easing?: (normalizedTime: number) => number;
}
export default function useTransition({
  targetValue,
  name,
  startValue,
  easing,
}: IUseTransitionProps) {
  const [renderValue, setRenderValue] = React.useState(
    startValue || targetValue
  );

  React.useEffect(() => {
    d3.selection()
      .transition(name)
      .duration(2000)
      .ease(easing || d3.easeLinear)
      .tween(name, () => {
        const interpolate = d3.interpolate(renderValue, targetValue);
        return (t) => setRenderValue(interpolate(t));
      });
  }, [targetValue]);

  return renderValue;
}
