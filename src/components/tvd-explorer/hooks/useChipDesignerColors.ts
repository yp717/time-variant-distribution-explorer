"use client";

import * as React from "react";

import * as d3 from "d3";
import { useTheme } from "next-themes";

// This color palette was taken from the IBM Carbon Design System
// https://carbondesignsystem.com/data-visualization/color-palettes/
const darkModePalette = [
  "#8a3ffc",
  // 02. Cyan 40
  "#33b1ff",
  // 03. Teal 60
  "#007d79",
  // 04. Magenta 40
  "#ff7eb6",
  // 05. Red 50
  "#fa4d56",
  // 06. Red 10
  "#fff1f1",
  // 07. Green 30
  "#6fdc8c",
  // 08. Blue 50
  "#4589ff",
  // 09. Magenta 60
  "#d12771",
  // 10. Yellow 40
  "#d2a106",
  // 11. Teal 40
  "#08bdba",
  // 12. Cyan 20
  "#bae6ff",
  // 13. Orange 60
  "#ba4e00",
  // 14. Purple 30
  "#d4bbff",
];

const lightModePalette = [
  // 01. Purple 70
  "#6929c4",
  // 02. Cyan 50
  "#1192e8",
  // 03. Teal 70
  "#005d5d",
  // 04. Magenta 70
  "#9f1853",
  // 05. Red 50
  "#fa4d56",
  // 06. Red 90
  "#570408",
  // 07. Green 60
  "#198038",
  // 08. Blue 80
  "#002d9c",
  // 09. Magenta 50
  "#ee538b",
  // 10. Yellow 50
  "#b28600",
  // 11. Teal 50
  "#009d9a",
  // 12. Cyan 90
  "#012749",
  // 13. Orange 70
  "#8a3800",
  // 14. Purple 50
  "#a56eff",
];

export default function useChipDesignerColors() {
  const { theme } = useTheme();

  const color = React.useMemo(
    () =>
      d3
        .scaleOrdinal()
        .domain([
          "AMD",
          "ARM",
          "Apple",
          "Fujitsu",
          "Hitachi",
          "Huawei",
          "IBM",
          "Intel",
          "Microsoft/AMD",
          "Motorola",
          "NEC",
          "Nvidia",
          "Oracle",
          "Samsung",
          "Sun/Oracle",
          "Toshiba",
          "Moore",
        ])
        .range(theme === "dark" ? darkModePalette : lightModePalette),
    [theme]
  );

  return color;
}
