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
  //output: "export", // Outputs a Single-Page Application (SPA).
  //distDir: "./dist", // Changes the build output directory to `./dist/`.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  poweredByHeader: false,
  env: {
    APP_COMMIT_HASH: getCommitHash(),
  },
};

export default nextConfig;
