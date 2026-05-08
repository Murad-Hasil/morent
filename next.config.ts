import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// Only block during local dev/build — Vercel build runs without APP_SECRET
// but the proxy handles it at runtime for all deployed environments.
const isBuild = process.env.NEXT_PHASE === "phase-production-build";
const isVercel = !!process.env.VERCEL;

if (!process.env.APP_SECRET && !isBuild && !isVercel) {
  throw new Error(
    "\n\n❌  APP_SECRET is not set.\n" +
    "    Create a .env.local file in the project root and add:\n\n" +
    "    APP_SECRET=your-secret-here\n\n" +
    "    This project requires a valid configuration to run.\n"
  );
}

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  // Exclude all images from the public/ precache — images are served from the
  // CDN and get cached on-demand by the runtime StaleWhileRevalidate route.
  // Pre-downloading them on SW install saturates bandwidth on first visit.
  publicExcludes: ["!**/*.png", "!**/*.jpg", "!**/*.jpeg", "!**/*.gif", "!**/*.svg", "!**/*.ico", "!**/*.webp"],
  workboxOptions: {
    disableDevLogs: true,
    // Only precache webpack assets ≤ 50 KB. This excludes framework.js,
    // main.js, and the two large shared chunks (>190 KB each) from the
    // up-front precache. They are still cached on first access via the
    // runtime CacheFirst route for /_next/static JS.
    maximumFileSizeToCacheInBytes: 50 * 1024,
  },
  fallbacks: {
    document: "/offline",
  },
});

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [{ hostname: "i.pravatar.cc" }],
  },
};

export default withPWA(nextConfig);
