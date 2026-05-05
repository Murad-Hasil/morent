import type { NextConfig } from "next";

if (!process.env.APP_SECRET) {
  throw new Error(
    "\n\n❌  APP_SECRET is not set.\n" +
    "    Create a .env.local file in the project root and add:\n\n" +
    "    APP_SECRET=your-secret-here\n\n" +
    "    This project requires a valid configuration to run.\n"
  );
}

const nextConfig: NextConfig = {};

export default nextConfig;
