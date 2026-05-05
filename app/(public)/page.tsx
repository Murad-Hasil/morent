import HeroBanner from "@/components/HeroBanner";
import SearchForm from "@/components/SearchForm";
import PopularCars from "@/components/PopularCars";
import RecommendationCars from "@/components/RecommendationCars";

export default function Home() {
  return (
    <main className="w-full px-6 py-8 flex flex-col gap-8">
      <HeroBanner />
      <SearchForm />
      <PopularCars />
      <RecommendationCars />
    </main>
  );
}
