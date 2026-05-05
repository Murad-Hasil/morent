import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your car rental booking. Fill in your billing, rental details, and payment information to confirm your reservation.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="w-full px-6 py-8">
      <CheckoutForm />
    </div>
  );
}
