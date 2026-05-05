import Link from "next/link";
import CarCard from "./CarCard";
import { allCars } from "@/lib/data";

const recommendationCars = allCars.slice(4);

export default function RecommendationCars() {
  return (
    <section>
      <h2 className="text-gray-400 text-sm font-medium mb-5">Recommendation Car</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {recommendationCars.map((car, i) => {
          const globalId = i + 4;
          return <CarCard key={i} id={globalId} {...car} index={i} />;
        })}
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/cars" className="bg-[#3563E9] hover:bg-[#2a52c9] transition-colors text-white text-sm font-semibold px-8 py-3 rounded-[4px]">
          Show more car
        </Link>
      </div>
    </section>
  );
}
