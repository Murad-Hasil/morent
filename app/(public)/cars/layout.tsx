import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Cars",
  description: "Browse and filter our wide selection of rental cars. Find the perfect vehicle for any occasion at the best prices.",
  openGraph: {
    title: "Browse Cars — Morent",
    description: "Browse and filter our wide selection of rental cars. Find the perfect vehicle for any occasion at the best prices.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Morent Car Listings" }],
  },
};

export default function CarsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
