import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  title: { default: "Morent — Car Rental", template: "%s | Morent" },
  description: "The best platform for car rental. Ease of doing a car rental safely and reliably at a low price.",
  keywords: ["car rental", "rent a car", "morent", "affordable car rental"],
  authors: [{ name: "Morent" }],
  metadataBase: new URL("https://morent.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "Morent",
    title: "Morent — The Best Platform for Car Rental",
    description: "Ease of doing a car rental safely and reliably. Of course at a low price.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morent — Car Rental",
    description: "The best platform for car rental at a low price.",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`} suppressHydrationWarning>
      {/* Blocking inline script — applies saved theme before first paint to avoid CLS flash */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('morent-theme'),d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(!t&&d))document.documentElement.classList.add('dark')}catch(e){}` }} />
      </head>
      <body className="min-h-full flex flex-col bg-[#F6F7F9] dark:bg-gray-950 transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
