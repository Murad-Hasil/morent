"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFavorites, useSelectedCar } from "@/lib/store";
import { Car } from "@/lib/data";

interface CarCardProps {
  id: number;
  name: string;
  type: Car["type"];
  image?: string;
  fuel: string;
  transmission: string;
  capacity: string | number;
  price: number;
  originalPrice?: number;
  index?: number;
  priority?: boolean;
}

export default function CarCard({
  id, name, type, image, fuel, transmission, capacity,
  price, originalPrice, index = 0, priority = false,
}: CarCardProps) {
  const { toggle, isFavorite: isFav } = useFavorites();
  const setSelectedCar = useSelectedCar((s) => s.setSelectedCar);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const fav = mounted && isFav(name);

  function handleRentNow() {
    setSelectedCar({ id, name, type, image: image ?? "", fuel, transmission, capacity: typeof capacity === "string" ? parseInt(capacity) : capacity, price, originalPrice });
    router.push("/checkout");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(53,99,233,0.12)" }}
      data-testid="car-card"
      className="bg-white dark:bg-gray-900 rounded-[10px] p-5 flex flex-col gap-4 cursor-pointer border border-transparent dark:border-gray-800 transition-colors"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <Link href={`/cars/detail?id=${id}`} className="hover:underline min-w-0">
          <h3 className="font-bold text-gray-900 dark:text-white text-base truncate">{name}</h3>
          <span className="text-xs text-gray-400 dark:text-gray-500">{type}</span>
        </Link>
        <motion.button
          whileTap={{ scale: 0.8 }}
          aria-label={fav ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
          aria-pressed={fav}
          onClick={() => {
            toggle(name);
            toast(fav ? "Removed from favorites" : "Added to favorites", {
              icon: fav ? "💔" : "❤️",
              duration: 2000,
            });
          }}
          className="shrink-0 ml-2"
        >
          <motion.div animate={{ scale: fav ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
            <Heart
              size={20}
              aria-hidden="true"
              className={fav ? "fill-red-500 text-red-500" : "text-gray-300 hover:text-red-400 transition-colors"}
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Car Image */}
      <Link href={`/cars/detail?id=${id}`} className="relative w-full h-[120px] block overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-300 text-xs">No Image</span>
          </div>
        )}
      </Link>

      {/* Specs */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>⛽ {fuel}</span>
        <span>⚙️ {transmission}</span>
        <span>👤 {typeof capacity === "number" ? `${capacity} People` : capacity}</span>
      </div>

      {/* Price + Button */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-base font-bold text-gray-900 dark:text-white">
            ${price.toFixed(2)}/<span className="text-xs font-normal text-gray-400">day</span>
          </div>
          {originalPrice && (
            <div className="text-xs text-gray-300 line-through">${originalPrice.toFixed(2)}</div>
          )}
        </div>
        <button
          onClick={handleRentNow}
          className="bg-[#3563E9] hover:bg-[#2a52c9] transition-colors text-white text-sm font-semibold px-4 py-2 rounded-[4px]"
        >
          Rent Now
        </button>
      </div>
    </motion.div>
  );
}
