export default function Filters() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Type</label>
        <select
          className="border border-neutral-200 dark:border-neutral-800 rounded-md p-2"
          name="chip-type"
          id="chip-type"
        >
          <option value="all">All</option>
          <option value="CPU">CPU</option>
          <option value="GPU">GPU</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Designer</label>
        <select
          className="border border-neutral-200 dark:border-neutral-800 rounded-md p-2"
          name="chip-designer"
          id="chip-designer"
        >
          <option value="all">All</option>
          <option value="CPU">CPU</option>
          <option value="GPU">GPU</option>
        </select>
      </div>
    </div>
  );
}
