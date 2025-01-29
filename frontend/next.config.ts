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
  typescript: {},
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: String(process.env.NEXT_PUBLIC_API_URL),
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
