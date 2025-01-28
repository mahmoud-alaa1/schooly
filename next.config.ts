import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://school-management-a2d5azgtedfeg9b8.canadacentral-01.azurewebsites.net/api/:path*",
      },
    ];
  },
};

export default nextConfig;
