import * as React from "react";

import TVDFilter from "./filter";

interface TVDHeaderProps {
  typeFilter: "All" | "CPU" | "GPU";
  setTypeFilter: React.Dispatch<React.SetStateAction<"All" | "CPU" | "GPU">>;
  designerFilter: string;
  setDesignerFilter: React.Dispatch<React.SetStateAction<string>>;
  designerOptions: string[];
  groupBy: "none" | "type" | "designer";
  setGroupBy: React.Dispatch<
    React.SetStateAction<"none" | "type" | "designer">
  >;
}

const TVDHeader: React.FC<TVDHeaderProps> = ({
  typeFilter,
  setTypeFilter,
  designerFilter,
  setDesignerFilter,
  designerOptions,
  groupBy,
  setGroupBy,
}) => {
  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 flex items-center justify-between">
      <div className="flex divide-x-2 divide-neutral-300 dark:divide-neutral-800">
        <div className="flex gap-x-2 mr-2">
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
        <div className="pl-2">
          <TVDFilter
            label="Group by"
            options={["none", "type", "designer"]}
            value={groupBy}
            onChange={(value) =>
              setGroupBy(value as "none" | "type" | "designer")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TVDHeader;
