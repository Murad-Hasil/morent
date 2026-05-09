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
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["travel", "business"],
  };
}
