import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "localhost",
      "yesha-reality-backend-staging.up.railway.app",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
