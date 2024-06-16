import * as React from "react";
import DarkModeToggle from "../darkmode-toggle";

export default function Header() {
  return (
    <div className="flex w-full justify-between items-center">
      <h1>TVD Explorer Demo with Moore&apos;s Law</h1>
      <DarkModeToggle />
    </div>
  );
}
