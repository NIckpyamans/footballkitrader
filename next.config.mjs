/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" }
    ]
  },
  transpilePackages: ["react-native", "react-native-web", "nativewind"],
  experimental: {
    optimizePackageImports: ["lucide-react"]
  }
};

export default nextConfig;
