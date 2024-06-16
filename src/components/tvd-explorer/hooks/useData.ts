import * as React from "react";
import * as d3 from "d3";

type YearToDataMap = Record<
  number,
  {
    name: string;
    designer: string;
    year: number;
    transistors: number;
    type: string;
  }[]
>;

type CSVRow = Record<string, string>;

const getYear = (row: CSVRow): number =>
  Number(row["Date of introduction"].replace(/\[.*\]/g, ""));

const getName = (row: CSVRow, type: string): string =>
  `${row["Processor"].replace(/\(.*\)/g, "")} (${type})`;

const getTransistors = (row: CSVRow): number =>
  Number(
    row["MOS transistor count"].replace(/\[.*\]/g, "").replace(/[^0-9]/g, "")
  );

/**
 * Custom hook to fetch and process data from CSV files.
 * @param filter - A string indicating the type of data to fetch: 'CPU', 'GPU', or 'all'.
 * @returns The processed data grouped by year.
 */
export default function useData(filter: "CPU" | "GPU" | "all" = "all") {
  const [data, setData] = React.useState<YearToDataMap | null>(null);

  React.useEffect(() => {
    (async () => {
      const datas = await Promise.all([
        d3.csv("data/microprocessors.csv", (row) => ({
          name: getName(row, "CPU"),
          designer: row["Designer"],
          year: getYear(row),
          transistors: getTransistors(row),
          type: "CPU",
        })),
        d3.csv("data/gpus.csv", (row) => ({
          name: getName(row, "GPU"),
          designer: row["Designer"],
          year: getYear(row),
          transistors: getTransistors(row),
          type: "GPU",
        })),
      ]);

      // Merge data and filter based on the provided filter
      const mergedData = datas
        .flat()
        .filter((item) => filter === "all" || item.type === filter);

      // Group by year and accumulate data
      const grouped = mergedData
        .sort((a, b) => a.year - b.year)
        .reduce((groups: YearToDataMap, el) => {
          if (!groups[el.year]) {
            const previous = groups[el.year - 1];
            groups[el.year] = previous ? [...previous] : [];
          }

          groups[el.year].push(el);

          return groups;
        }, {});

      setData(grouped);
    })();
  }, [filter]);

  return data;
}
