import TVDFilter from "./filter";

export default function Filters() {
  return (
    <div className="flex gap-4">
      <TVDFilter label="Filter by Type" options={["All", "CPU", "GPU"]} />
      <TVDFilter label="Filter by Designer" options={["All", "CPU", "GPU"]} />
    </div>
  );
}
