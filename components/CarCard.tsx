import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import RentNowButton from "./RentNowButton";
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
  return (
    <div
      style={{ animationDelay: `${index * 0.07}s` }}
      data-testid="car-card"
      className="animate-fade-in-up bg-white dark:bg-gray-900 rounded-[10px] p-5 flex flex-col gap-4 cursor-pointer border border-transparent dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(53,99,233,0.12)]"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <Link href={`/cars/detail?id=${id}`} className="hover:underline min-w-0">
          <h3 className="font-bold text-gray-900 dark:text-white text-base truncate">{name}</h3>
          <span className="text-xs text-gray-400 dark:text-gray-500">{type}</span>
        </Link>
        <FavoriteButton name={name} />
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
        <RentNowButton id={id} />
      </div>
    </div>
  );
}
