import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static.tvmaze.com',
                port: '',
                pathname: '/uploads/images/**',
            },
        ],
    },
  reactCompiler: true,
};

export default nextConfig;
