"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";
import { useFavorites, useSelectedCar } from "@/lib/store";
import { Car } from "@/lib/data";

interface CarDetailProps {
  car: Car & { id: number };
}

export default function CarDetail({ car }: CarDetailProps) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { toggle, isFavorite: isFav } = useFavorites();
  const setSelectedCar = useSelectedCar((s) => s.setSelectedCar);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const fav = mounted && isFav(car.name);

  // Build thumbnails — use same image 3 times (real app would have multiple angles)
  const thumbnails = [car.image, car.image, car.image];

  function handleRentNow() {
    setSelectedCar(car);
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* Left — Images */}
      <div className="flex flex-col gap-4 lg:w-[380px] shrink-0">
        {/* Hero Image */}
        <div className="relative w-full h-[240px] rounded-[10px] overflow-hidden bg-gradient-to-br from-[#1C3FA8] to-[#3563E9] flex items-end justify-center px-6 pt-6">
          <p className="absolute top-6 left-6 text-white font-bold text-xl leading-tight max-w-[160px]">
            Sports car with the best design and acceleration
          </p>
          <div className="relative w-full h-[130px]">
            <Image
              src={thumbnails[activeThumb]}
              alt={car.name}
              fill
              priority
              sizes="380px"
              className="object-contain object-bottom drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3" role="tablist" aria-label="Car image thumbnails">
          {thumbnails.map((src, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={activeThumb === i}
              aria-label={`View image ${i + 1}`}
              onClick={() => setActiveThumb(i)}
              className={`relative flex-1 h-[72px] rounded-[8px] overflow-hidden border-2 transition-colors bg-white dark:bg-gray-800 ${
                activeThumb === i ? "border-[#3563E9]" : "border-transparent dark:border-gray-700"
              }`}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      </div>

      {/* Right — Info */}
      <div className="flex-1 bg-white dark:bg-gray-900 rounded-[10px] p-6 flex flex-col gap-4 border border-transparent dark:border-gray-800">
        {/* Name + Heart */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{car.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">
                {[1, 2, 3, 4].map((s) => (
                  <Star key={s} size={14} className="fill-[#FBAD39] text-[#FBAD39]" />
                ))}
                <Star size={14} className="text-gray-200 fill-gray-200" />
              </div>
              <span className="text-xs text-gray-400">440+ Reviewer</span>
            </div>
          </div>
          <button
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={fav}
            onClick={() => toggle(car.name)}
          >
            <Heart
              size={22}
              aria-hidden="true"
              className={fav ? "fill-red-500 text-red-500" : "text-gray-300 hover:text-red-400 transition-colors"}
            />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed">
          Experience the thrill of driving the {car.name} — a {car.type.toLowerCase()} built for
          performance and comfort. With {car.fuel} fuel capacity and {car.transmission.toLowerCase()} transmission,
          every journey becomes an adventure.
        </p>

        {/* Specs Table */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Type Car</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">{car.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Capacity</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">{car.capacity} Person</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Steering</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">{car.transmission}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Gasoline</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">{car.fuel}</span>
          </div>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-auto pt-4">
          <div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">${car.price.toFixed(2)}</span>
            <span className="text-sm text-gray-400"> / day</span>
            {car.originalPrice && (
              <div className="text-sm text-gray-300 line-through">${car.originalPrice.toFixed(2)}</div>
            )}
          </div>
          <button
            onClick={handleRentNow}
            className="bg-[#3563E9] hover:bg-[#2a52c9] transition-colors text-white font-semibold px-8 py-3 rounded-[4px]"
          >
            Rent Now
          </button>
        </div>
      </div>

    </div>
  );
}
