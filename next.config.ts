import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statikus exportot használunk, mert a projekt Nethely tárhelyre készül.
  output: "export",
  // A statikus export miatt a Next Image optimalizálását kikapcsoljuk.
  images: {
    unoptimized: true,
  },
  // A trailing slash segít több egyszerűbb statikus tárhely esetén.
  trailingSlash: true,
};

export default nextConfig;
