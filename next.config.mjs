import withBundleAnalyzer from "@next/bundle-analyzer";
import * as child from "child_process";
import fs from "fs";

function getCommitHash() {
  if (fs.existsSync(".git")) {
    return JSON.stringify(child.execSync("git rev-parse --short HEAD").toString());
  } else {
    console.warn("Cannot get current commit hash because the .git folder does not exist.");
    return JSON.stringify("unknown");
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  poweredByHeader: false,
  env: {
    APP_COMMIT_HASH: getCommitHash(),
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
  },
  webpack: config => {
    config.resolve.alias.canvas = false;
    return config;
  },
  async headers() {
    return [
      {
        source: "/:all*(ttf|otf|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2628000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "develop-onlydust-app-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "staging-onlydust-app-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "onlydust-app-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "od-metadata-assets-develop.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "od-metadata-assets-staging.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "od-metadata-assets-production.s3.eu-west-1.amazonaws.com",
      },
    ],
    // ordered list of acceptable optimized image formats (mime types)
    formats: ["image/webp", "image/avif"],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
