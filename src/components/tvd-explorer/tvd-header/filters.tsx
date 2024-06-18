import * as React from "react";

import TVDFilter from "./filter";

interface TVDFiltersProps {
  typeFilter: "All" | "CPU" | "GPU";
  setTypeFilter: (value: "All" | "CPU" | "GPU") => void;
  designerFilter: string;
  setDesignerFilter: (value: string) => void;
  designerOptions: string[];
}

export function TVDFilters({
  typeFilter,
  setTypeFilter,
  designerFilter,
  setDesignerFilter,
  designerOptions,
}: TVDFiltersProps) {
  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 flex items-center justify-between">
      <div className="flex gap-4">
        <TVDFilter
          label="Filter by Type"
          options={["All", "CPU", "GPU"]}
          value={typeFilter}
          onChange={(value) => setTypeFilter(value as "All" | "CPU" | "GPU")}
        />
        <TVDFilter
          label="Filter by Designer"
          options={designerOptions}
          value={designerFilter}
          onChange={(value) => setDesignerFilter(value)}
        />
      </div>
    </div>
  );
}
