import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow importing Three.js and related WASM/binary modules
  transpilePackages: ["three"],
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
