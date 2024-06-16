import * as d3 from "d3";

export default function mooresLaw(): Record<number, number> {
  const rangeStart = 1971;
  const rangeEnd = 2019;
  const startValue = 1000;

  return d3.range(rangeStart, rangeEnd).reduce(
    (law, year) => {
      if (year % 2 === 0) {
        const count = law[year - 2] * 2;
        const delta = count - law[year - 2];

        law[year - 1] = law[year - 2] + delta / 2;
        law[year] = count;
      }
      return law;
    },
    { [rangeStart - 1]: startValue }
  );
}
