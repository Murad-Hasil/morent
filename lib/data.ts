export interface Car {
  name: string;
  type: "Sport" | "SUV" | "MPV" | "Sedan" | "Coupe" | "Hatchback";
  fuel: string;
  transmission: string;
  capacity: number;
  price: number;
  originalPrice?: number;
  image: string;
}

export const allCars: Car[] = [
  { name: "Koenigsegg",     type: "Sport",    fuel: "90L",  transmission: "Manual", capacity: 2, price: 99,  originalPrice: 119, image: "/cars/koenigsegg.png"         },
  { name: "Nissan GT - R",  type: "Sport",    fuel: "80L",  transmission: "Manual", capacity: 2, price: 80,  originalPrice: 100, image: "/cars/nissan-gtr-1.png"        },
  { name: "Rolls - Royce",  type: "Sport",    fuel: "100L", transmission: "Manual", capacity: 4, price: 96,  originalPrice: 116, image: "/cars/rolls-royce.png"          },
  { name: "Nissan GT - R",  type: "Sport",    fuel: "80L",  transmission: "Manual", capacity: 2, price: 80,  originalPrice: 100, image: "/cars/nissan-gtr-2.png"         },
  { name: "All New Rush",   type: "SUV",      fuel: "70L",  transmission: "Manual", capacity: 6, price: 72,  originalPrice: 92,  image: "/cars/all-new-rush.png"        },
  { name: "CR - V",         type: "SUV",      fuel: "80L",  transmission: "Manual", capacity: 6, price: 80,  originalPrice: 100, image: "/cars/cr-v-1.png"               },
  { name: "All New Terios", type: "SUV",      fuel: "70L",  transmission: "Manual", capacity: 6, price: 74,  originalPrice: 94,  image: "/cars/all-new-terios.png"      },
  { name: "CR - V",         type: "SUV",      fuel: "80L",  transmission: "Manual", capacity: 6, price: 80,  originalPrice: 100, image: "/cars/cr-v-2.png"               },
  { name: "MO ZX Exclusice",type: "Sport",    fuel: "90L",  transmission: "Manual", capacity: 2, price: 76,  originalPrice: 96,  image: "/cars/moz-exclusive-white.png"  },
  { name: "New MO ZS",      type: "Sport",    fuel: "80L",  transmission: "Manual", capacity: 2, price: 80,  originalPrice: 100, image: "/cars/new-mozs-white.png"       },
  { name: "MO ZX Excite",   type: "Sport",    fuel: "80L",  transmission: "Manual", capacity: 2, price: 74,  originalPrice: 94,  image: "/cars/moz-excite-blue.png"      },
  { name: "New MO ZS",      type: "Sport",    fuel: "80L",  transmission: "Manual", capacity: 2, price: 80,  originalPrice: 100, image: "/cars/new-mozs-blue.png"        },
];

export const carTypes = ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"] as const;
export const capacities = [2, 4, 6, 8] as const;
