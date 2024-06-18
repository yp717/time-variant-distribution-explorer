import * as React from "react";

export function useFilteredData(
  data: any,
  typeFilter: "All" | "CPU" | "GPU",
  designerFilter: string
) {
  const [filteredData, setFilteredData] = React.useState<any>(data);

  React.useEffect(() => {
    if (data) {
      const filtered = Object.entries(data).reduce((acc, [year, entries]) => {
        const filteredEntries = entries.filter(
          (item) =>
            (typeFilter === "All" || item.type === typeFilter) &&
            (designerFilter === "All" || item.designer === designerFilter)
        );
        acc[Number(year)] = filteredEntries;
        return acc;
      }, {} as typeof data);
      setFilteredData(filtered);
    }
  }, [data, typeFilter, designerFilter]);

  return filteredData;
}
