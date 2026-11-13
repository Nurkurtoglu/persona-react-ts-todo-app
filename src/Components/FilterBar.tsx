import React from "react";
import type { FilterType } from "../Interfaces/Task";

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  totalCount: number;
  completedCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  currentFilter,
  onFilterChange,
  totalCount,
  completedCount,
}) => {
  const filters: { label: string; value: FilterType }[] = [
    { label: "Tümü", value: "ALL" },
    { label: "Devam Edenler", value: "ACTIVE" },
    { label: "Tamamlananlar", value: "COMPLETED" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-4">
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              currentFilter === f.value
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="text-sm text-slate-500 font-medium">
        Tamamlanan:{" "}
        <span className="text-indigo-600 font-bold">{completedCount}</span> /{" "}
        {totalCount}
      </div>
    </div>
  );
};
