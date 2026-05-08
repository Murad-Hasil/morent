"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { showToast } from "@/lib/toast";
import { useFavorites } from "@/lib/store";

export default function FavoriteButton({ name }: { name: string }) {
  const { toggle, isFavorite } = useFavorites();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const fav = mounted && isFavorite(name);

  return (
    <button
      aria-label={fav ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
      aria-pressed={fav}
      onClick={() => {
        toggle(name);
        showToast(fav ? "Removed from favorites" : "Added to favorites", { icon: fav ? "💔" : "❤️", duration: 2000 });
      }}
      className="shrink-0 ml-2 active:scale-75 transition-transform"
    >
      <Heart
        key={fav ? "fav" : "not-fav"}
        size={20}
        aria-hidden="true"
        className={fav ? "fill-red-500 text-red-500 animate-heartbeat" : "text-gray-300 hover:text-red-400 transition-colors"}
      />
    </button>
  );
}
