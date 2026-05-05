import type { NextConfig } from "next";

// Only block during local dev/build — Vercel build runs without APP_SECRET
// but the middleware handles it at runtime for all deployed environments.
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

const nextConfig: NextConfig = {};

export default nextConfig;
