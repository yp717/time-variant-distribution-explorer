import * as React from "react";

import Filters from "./filters";

export default function TVDHeader() {
  return (
    <div className="w-full h-24 border-b border-neutral-200 dark:border-neutral-800 p-4 flex items-center justify-between">
      <Filters />
    </div>
  );
}
