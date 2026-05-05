"use client";

import { useState } from "react";
import { allCars, carTypes, capacities } from "@/lib/data";

export interface FilterState {
  types: string[];
  caps: number[];
  maxPrice: number;
}

interface Props {
  filters?: FilterState;
  onChange?: (f: FilterState) => void;
}

export default function FilterSidebar({ filters: externalFilters, onChange }: Props) {
  const [localFilters, setLocalFilters] = useState<FilterState>(defaultFilters);
  const filters = externalFilters ?? localFilters;
  const handleChange: (f: FilterState) => void = onChange ?? setLocalFilters;
  function toggleType(t: string) {
    handleChange({
      ...filters,
      types: filters.types.includes(t) ? filters.types.filter((x) => x !== t) : [...filters.types, t],
    });
  }

  function toggleCap(c: number) {
    handleChange({
      ...filters,
      caps: filters.caps.includes(c) ? filters.caps.filter((x) => x !== c) : [...filters.caps, c],
    });
  }

  return (
    <aside className="w-full lg:w-[260px] shrink-0 bg-white dark:bg-gray-900 rounded-[10px] p-6 flex flex-col gap-8 self-start border border-transparent dark:border-gray-800 transition-colors">

      {/* Type */}
      <div>
        <p className="text-xs font-semibold text-gray-300 tracking-widest uppercase mb-4">Type</p>
        <ul className="flex flex-col gap-3">
          {carTypes.map((t) => {
            const count = allCars.filter((c) => c.type === t).length;
            const checked = filters.types.includes(t);
            return (
              <li key={t} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleType(t)}>
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-[#3563E9] border-[#3563E9]" : "border-gray-300 dark:border-gray-600"}`}>
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{t}</span>
                <span className="text-xs text-gray-300 dark:text-gray-600 ml-auto">({count})</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Capacity */}
      <div>
        <p className="text-xs font-semibold text-gray-300 tracking-widest uppercase mb-4">Capacity</p>
        <ul className="flex flex-col gap-3">
          {capacities.map((c) => {
            const label = c === 8 ? "8 or More" : `${c} Person`;
            const count = allCars.filter((car) => (c === 8 ? car.capacity >= 8 : car.capacity === c)).length;
            const checked = filters.caps.includes(c);
            return (
              <li key={c} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleCap(c)}>
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-[#3563E9] border-[#3563E9]" : "border-gray-300 dark:border-gray-600"}`}>
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{label}</span>
                <span className="text-xs text-gray-300 dark:text-gray-600 ml-auto">({count})</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Price */}
      <div>
        <p className="text-xs font-semibold text-gray-300 tracking-widest uppercase mb-4">Price</p>
        <input
          type="range" min={0} max={200} value={filters.maxPrice}
          onChange={(e) => handleChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[#3563E9] cursor-pointer"
        />
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">Max. ${filters.maxPrice}.00</p>
      </div>

      {/* Clear All */}
      <button
        onClick={() => handleChange(defaultFilters)}
        className="w-full py-2 text-sm font-semibold text-[#3563E9] border border-[#3563E9] rounded-[8px] hover:bg-[#3563E9] hover:text-white transition-colors"
      >
        Clear All Filters
      </button>

    </aside>
  );
}

export const defaultFilters = { types: [], caps: [], maxPrice: 200 };
