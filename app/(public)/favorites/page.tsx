"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/store";
import { allCars } from "@/lib/data";
import CarCard from "@/components/CarCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteCars = allCars.filter((car) => favorites.includes(car.name));

  return (
    <main className="w-full px-6 py-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">My Favorites</h1>
        <span className="text-sm text-gray-400">{favoriteCars.length} {favoriteCars.length === 1 ? "car" : "cars"}</span>
      </div>

      {favoriteCars.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <span className="text-5xl">🤍</span>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">No favorites yet</p>
          <p className="text-sm text-gray-400">Click the heart icon on any car to save it here</p>
          <Link href="/cars" className="mt-2 text-[#3563E9] text-sm font-semibold hover:underline">
            Browse Cars
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {favoriteCars.map((car, i) => (
            <CarCard key={car.name + i} id={allCars.indexOf(car)} {...car} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
