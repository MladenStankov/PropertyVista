import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img.icons8.com",
      "lh3.googleusercontent.com",
      "property-vista-images.s3.eu-north-1.amazonaws.com",
      "property-vista-images.s3.amazonaws.com",
      "placehold.co",
    ],
  },
  pageExtensions: ["ts", "tsx"],
};

export default nextConfig;
