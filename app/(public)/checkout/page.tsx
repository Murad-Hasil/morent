import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import { allCars } from "@/lib/data";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your car rental booking. Fill in your billing, rental details, and payment information to confirm your reservation.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const carId = parseInt(id ?? "0");
  const found = allCars.find((_, i) => i === carId);
  const car = found ? { ...found, id: carId } : { ...allCars[0], id: 0 };

  return (
    <div className="w-full px-6 py-8">
      <CheckoutForm initialCar={car} />
    </div>
  );
}
