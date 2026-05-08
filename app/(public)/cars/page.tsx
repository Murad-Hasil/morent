"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FilterSidebar, { defaultFilters, type FilterState } from "@/components/FilterSidebar";
import SearchForm from "@/components/SearchForm";
import CarCard from "@/components/CarCard";
import CarCardSkeleton from "@/components/CarCardSkeleton";
import { allCars } from "@/lib/data";

function CarsContent() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [visibleCount, setVisibleCount] = useState(9);
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.trim() ?? "";

  useEffect(() => {
    setVisibleCount(9);
  }, [filters, q]);

  const filtered = allCars.filter((car) => {
    const typeOk  = filters.types.length === 0 || filters.types.includes(car.type);
    const capOk   = filters.caps.length  === 0 || filters.caps.some((c) => c === 8 ? car.capacity >= 8 : car.capacity === c);
    const priceOk = car.price <= filters.maxPrice;
    const nameOk  = !q || car.name.toLowerCase().includes(q.toLowerCase());
    return typeOk && capOk && priceOk && nameOk;
  });

  return (
    <div className="w-full px-6 py-8 flex flex-col lg:flex-row gap-6 lg:items-start">
      <FilterSidebar filters={filters} onChange={setFilters} />

      <div className="w-full flex-1 min-w-0 flex flex-col gap-6">
        <SearchForm />

        {q && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Search results for: <span className="font-semibold text-gray-800 dark:text-gray-200">"{q}"</span>
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="animate-fade-in-up flex flex-col items-center justify-center py-24 gap-4 text-center">
            <span className="text-5xl">🚗</span>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">No cars found</p>
            <p className="text-sm text-gray-400">Try adjusting your filters</p>
            <button
              onClick={() => setFilters(defaultFilters)}
              className="mt-2 text-[#3563E9] text-sm font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="animate-fade-in grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.slice(0, visibleCount).map((car, i) => {
              const globalId = allCars.indexOf(car);
              return <CarCard key={car.name + i} id={globalId} {...car} index={i} priority={i < 6} />;
            })}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="flex justify-center mt-2">
            {visibleCount < filtered.length ? (
              <button
                onClick={() => setVisibleCount(filtered.length)}
                className="bg-[#3563E9] hover:bg-[#2a52c9] transition-colors text-white text-sm font-semibold px-8 py-3 rounded-[4px]"
              >
                Show more car
              </button>
            ) : (
              <p className="text-sm text-gray-400">Showing all {filtered.length} cars</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={
      <div className="w-full px-6 py-8 flex flex-col lg:flex-row gap-6 lg:items-start">
        <div className="w-full lg:w-[260px] shrink-0 h-64 bg-white dark:bg-gray-900 rounded-[10px] animate-pulse" />
        <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <CarCardSkeleton key={i} />)}
        </div>
      </div>
    }>
      <CarsContent />
    </Suspense>
  );
}
