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
  experimental: {
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
  },
  webpack: config => {
    config.resolve.alias.canvas = false;
    return config;
  },
  async redirects() {
    return [
      {
        source: "/settings",
        destination: "/settings/profile",
        permanent: true,
      },
      {
        source: "/settings/billing/:id",
        destination: "/settings/billing/:id/general-information",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "onlydust-app-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "staging-onlydust-app-images.s3.eu-west-1.amazonaws.com",
      },
    ],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
