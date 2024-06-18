import * as React from "react";
import * as d3 from "d3";

export function useAnimationLoop(
  data: any,
  paused: boolean,
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>
) {
  React.useEffect(() => {
    if (paused) {
      return;
    }

    const interval = d3.interval(() => {
      setCurrentYear((year) => {
        if (year >= 2019 || !data || !data[year + 1]) {
          interval.stop();
          return Number(year);
        }
        return Number(year + 1);
      });
    }, 2000);

    return () => interval.stop();
  }, [data, paused, setCurrentYear]);
}
