"use client";

import * as React from "react";

import * as d3 from "d3";

export default function useChipDesignerColors() {
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
        .range([
          "#009933",
          "#0091BD",
          "#A3AAAE",
          "#d30909",
          "#F4ABAA",
          "#FA0505",
          "#1F70C1",
          "#0171C5",
          "#7FBA02",
          "#008DD2",
          "#14149F",
          "#77B900",
          "#F70000",
          "#034EA1",
          "#7F7F7F",
          "#FF0000",
          "#D92AAD",
        ]),
    []
  );

  return color;
}
