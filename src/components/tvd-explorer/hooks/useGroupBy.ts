import * as React from "react";
import { YearToDataMap } from "./useData";

type GroupBy = "none" | "type" | "designer";

export function useGroupBy(data: YearToDataMap, groupBy: GroupBy) {
  const [groupedData, setGroupedData] = React.useState<any>(data);

  React.useEffect(() => {
    if (data) {
      if (groupBy === "none") {
        setGroupedData(data);
        return;
      }

      const grouped = Object.entries(data).reduce((acc, [year, entries]) => {
        const groupedEntries = entries.reduce((groupAcc, entry) => {
          const groupKey = entry[groupBy];
          if (!groupAcc[groupKey]) {
            groupAcc[groupKey] = [];
          }
          groupAcc[groupKey].push(entry);
          return groupAcc;
        }, {} as Record<string, any[]>);

        const aggregatedEntries = Object.entries(groupedEntries).map(
          ([key, groupEntries]) => {
            const maxTransistors = Math.max(
              ...groupEntries.map((entry) => entry.transistors)
            );
            return {
              ...groupEntries[0],
              transistors: maxTransistors,
              name: key,
            };
          }
        );

        acc[Number(year)] = aggregatedEntries;
        return acc;
      }, {} as typeof data);
      setGroupedData(grouped);
    }
  }, [data, groupBy]);

  return groupedData;
}
