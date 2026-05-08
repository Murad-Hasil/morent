"use client";

import { useRouter } from "next/navigation";

export default function RentNowButton({ id }: { id: number }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/checkout?id=${id}`)}
      className="bg-[#3563E9] hover:bg-[#2a52c9] transition-colors text-white text-sm font-semibold px-4 py-2 rounded-[4px]"
    >
      Rent Now
    </button>
  );
}
