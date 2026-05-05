import { Suspense } from "react";
import { allCars } from "@/lib/data";
import CarDetail from "@/components/CarDetail";
import Reviews from "@/components/Reviews";
import RecentCars from "@/components/RecentCars";
import FilterSidebar from "@/components/FilterSidebar";
import CarCardSkeleton from "@/components/CarCardSkeleton";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const car = allCars[parseInt(id ?? "0", 10)] ?? allCars[0];
  return {
    title: `${car.name} — Morent`,
    description: `Rent the ${car.name} — a ${car.type} with ${car.fuel} fuel and ${car.transmission} transmission. $${car.price}/day.`,
  };
}

export default async function CarDetailPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const carId = Math.max(0, Math.min(parseInt(id ?? "0", 10), allCars.length - 1));
  const car = allCars[carId] ?? allCars[0];

  return (
    <div className="w-full px-6 py-8 flex flex-col lg:flex-row gap-6 items-start">
      <FilterSidebar />
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        <CarDetail car={{ ...car, id: carId }} />
        <Reviews />
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => <CarCardSkeleton key={i} />)}
          </div>
        }>
          <RecentCars />
        </Suspense>
      </div>
    </div>
  );
}
