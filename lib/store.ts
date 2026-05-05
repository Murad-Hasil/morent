import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car } from "@/lib/data";

interface FavoritesStore {
  favorites: string[];
  toggle: (carName: string) => void;
  isFavorite: (carName: string) => boolean;
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggle: (carName) =>
        set((state) => ({
          favorites: state.favorites.includes(carName)
            ? state.favorites.filter((n) => n !== carName)
            : [...state.favorites, carName],
        })),
      isFavorite: (carName) => get().favorites.includes(carName),
    }),
    { name: "morent-favorites" }
  )
);

interface SelectedCarStore {
  selectedCar: (Car & { id: number }) | null;
  setSelectedCar: (car: Car & { id: number }) => void;
}

export const useSelectedCar = create<SelectedCarStore>()(
  persist(
    (set) => ({
      selectedCar: null,
      setSelectedCar: (car) => set({ selectedCar: car }),
    }),
    { name: "morent-selected-car" }
  )
);

interface NotifStore {
  readIds: number[];
  markAllRead: (ids: number[]) => void;
  isRead: (id: number) => boolean;
}

export const useNotifs = create<NotifStore>()(
  persist(
    (set, get) => ({
      readIds: [],
      markAllRead: (ids) => set({ readIds: ids }),
      isRead: (id) => get().readIds.includes(id),
    }),
    { name: "morent-notifs" }
  )
);
