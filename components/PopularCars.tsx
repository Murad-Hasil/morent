import Link from "next/link";
import CarCard from "./CarCard";
import { allCars } from "@/lib/data";

const popularCars = allCars.slice(0, 4);

export default function PopularCars() {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-gray-400 text-sm font-medium">Popular Car</h2>
        <Link href="/cars" className="text-[#3563E9] text-sm font-semibold hover:underline">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {popularCars.map((car, i) => (
          <CarCard key={i} id={i} {...car} index={i} priority={i === 0} />
        ))}
      </div>
    </section>
  );
}
