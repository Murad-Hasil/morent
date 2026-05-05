"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Alex Stanton", role: "Car Rentals", date: "21 July 2022", rating: 4,
    text: "We are very happy with the service from the MORENT App. Providing a reasonable price and a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and easy to use.",
    avatar: "AS", avatarBg: "bg-blue-500",
  },
  {
    name: "Skylar Dias", role: "Car Enthusiast", date: "20 July 2022", rating: 4,
    text: "We are greatly helped by the services of the MORENT Application. Morent has a large and varied collection of cars at a good and comfortable facilities. In addition, the service provided by the officers is also very friendly and easy.",
    avatar: "SD", avatarBg: "bg-pink-400",
  },
  {
    name: "John Carter", role: "Business Traveler", date: "18 July 2022", rating: 5,
    text: "Excellent service and very competitive prices. The booking process was smooth and the car was in perfect condition. I will definitely use MORENT again for my next business trip.",
    avatar: "JC", avatarBg: "bg-green-500",
  },
  {
    name: "Priya Singh", role: "Family Trips", date: "15 July 2022", rating: 4,
    text: "Great selection of SUVs for family trips. The pick-up and drop-off were hassle-free. The car was clean and well-maintained. Highly recommended for families!",
    avatar: "PS", avatarBg: "bg-purple-500",
  },
  {
    name: "Marco Rossi", role: "Weekend Driver", date: "12 July 2022", rating: 5,
    text: "Rented a sport car for the weekend and it was an amazing experience. The car performed perfectly and the price was very fair. MORENT is my go-to rental service now.",
    avatar: "MR", avatarBg: "bg-orange-500",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={13} className={s <= rating ? "fill-[#FBAD39] text-[#FBAD39]" : "fill-gray-200 text-gray-200"} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[10px] p-6 flex flex-col gap-5 border border-transparent dark:border-gray-800">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Reviews</h2>
        <span className="bg-[#3563E9] text-white text-xs font-bold px-2.5 py-1 rounded-[4px]">{reviews.length}</span>
      </div>

      <div className="flex flex-col gap-6">
        {displayed.map((r) => (
          <div key={r.name} className="flex gap-4">
            <div className={`w-11 h-11 rounded-full ${r.avatarBg} flex items-center justify-center shrink-0`}>
              <span className="text-white text-sm font-bold">{r.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.role}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                  <span className="text-xs text-gray-400">{r.date}</span>
                  <StarRow rating={r.rating} />
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{r.text}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowAll(!showAll)}
        className="text-gray-500 dark:text-gray-400 text-sm font-semibold flex items-center gap-1 hover:text-[#3563E9] transition-colors"
      >
        {showAll ? "Show Less" : `Show All (${reviews.length})`}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${showAll ? "rotate-90" : ""}`}>
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
