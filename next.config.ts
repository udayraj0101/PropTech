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
};

export default nextConfig;
