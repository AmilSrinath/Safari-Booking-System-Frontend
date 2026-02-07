/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "export",
  basePath: "",
  assetPrefix: "./",
  images: {
    unoptimized: true,
  },
  distDir: "out",
  trailingSlash: true,
}

export default nextConfig
