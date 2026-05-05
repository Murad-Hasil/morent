import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Morent — Car Rental",
    short_name: "Morent",
    description: "The best platform for car rental at a low price.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F7F9",
    theme_color: "#3563E9",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      // Replace with real PNGs for full PWA install support:
      // { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      // { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
    categories: ["travel", "business"],
  };
}
