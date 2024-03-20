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
  productionBrowserSourceMaps: true,
  experimental: {
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
  },
  webpack: config => {
    config.resolve.alias.canvas = false;
    config.devtool = 'hidden-source-map'
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
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
