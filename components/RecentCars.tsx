import Link from "next/link";
import CarCard from "./CarCard";
import { allCars } from "@/lib/data";

const recentCars = allCars.slice(0, 3);
const recommendationCars = allCars.slice(4, 7);

function CarSection({ title, cars, startId }: { title: string; cars: typeof recentCars; startId: number }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm text-gray-400 font-medium">{title}</h2>
        <Link href="/cars" className="text-[#3563E9] text-sm font-semibold hover:underline">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {cars.map((car, i) => (
          <CarCard key={i} id={startId + i} {...car} index={i} />
        ))}
      </div>
    </section>
  );
}

export default function RecentCars() {
  return (
    <div className="flex flex-col gap-8">
      <CarSection title="Recent Car" cars={recentCars} startId={0} />
      <CarSection title="Recommendation Car" cars={recommendationCars} startId={4} />
    </div>
  );
}
