import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Favorites",
  description: "Your saved cars on Morent. Browse and manage your favourite rentals.",
};

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
