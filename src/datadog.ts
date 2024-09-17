"use client";

import { datadogLogs } from "@datadog/browser-logs";

if (process.env.NEXT_PUBLIC_ENV && process.env.NEXT_PUBLIC_ENABLE_DATADOG_LOG === "true") {
  datadogLogs.init({
    clientToken: "pub2b81d142f3b7d50d24dabbc30a91a4d7",
    site: "datadoghq.eu",
    service: "onlydust-app",
    env: process.env.NEXT_PUBLIC_ENV,
    version: process.env.APP_COMMIT_HASH,
    forwardErrorsToLogs: true,
    forwardConsoleLogs: ["error"],
    proxy: process.env.NEXT_PUBLIC_DATADOG_INTAKE_PROXY_URL,
  });
}
