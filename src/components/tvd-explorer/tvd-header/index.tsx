import * as React from "react";

import TVDFilter from "./filter";

interface ITVDHeaderProps {
  data: Record<
    number,
    {
      name: string;
      designer: string;
      year: number;
      transistors: number;
      type: string;
    }[]
  >;
  setTypeFilter: React.Dispatch<React.SetStateAction<"all" | "CPU" | "GPU">>;
  setDesignerFilter: (designer: string) => void;
}

export default function TVDHeader({
  data,
  setTypeFilter,
  setDesignerFilter,
}: ITVDHeaderProps) {
  const designerOptions = [
    "all",
    ...Array.from(
      new Set(
        Object.values(data ?? {})
          .flat()
          .map((d) => d.designer)
      )
    ),
  ]
    .filter((d) => d)
    .sort();

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 flex items-center justify-between">
      <div className="flex gap-4">
        <TVDFilter
          label="Filter by Type"
          options={["All", "CPU", "GPU"]}
          onChange={(value: string) =>
            setTypeFilter(value as "all" | "CPU" | "GPU")
          }
        />
        <TVDFilter
          label="Filter by Designer"
          options={designerOptions}
          onChange={(value: string) => setDesignerFilter(value)}
        />
      </div>
    </div>
  );
}
