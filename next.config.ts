import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "public.readdy.io" },
      { protocol: "https", hostname: "public.readdy.ai" },
      { protocol: "https", hostname: "readdy.ai" },
      { protocol: "https", hostname: "storage.helloreaddy.io" },
    ],
  },
  // Don't fail the production build on lint warnings (e.g. <img> vs next/image,
  // non-blocking react-hooks/exhaustive-deps). CI/lint stays available via
  // `npm run lint` locally.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
