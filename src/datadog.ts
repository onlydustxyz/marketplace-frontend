import { datadogLogs } from "@datadog/browser-logs";
import { datadogRum } from "@datadog/browser-rum";

if (process.env.NEXT_PUBLIC_ENV) {
  if (process.env.NEXT_PUBLIC_ENABLE_DATADOG_RUM === "true") {
    datadogRum.init({
      applicationId: "e6ac7edb-ca74-4ef7-9cb7-1ae8bea27db4",
      clientToken: "pub2b81d142f3b7d50d24dabbc30a91a4d7",
      site: "datadoghq.eu",
      service: "onlydust-app",
      env: process.env.NEXT_PUBLIC_ENV,
      version: process.env.APP_COMMIT_HASH,
      sessionSampleRate: Number(process.env.NEXT_PUBLIC_DATADOG_RUM_SAMPLE_RATE) || 100,
      sessionReplaySampleRate: Number(process.env.NEXT_PUBLIC_DATADOG_RUM_REPLAY_SAMPLE_RATE) || 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      trackFrustrations: true,
      defaultPrivacyLevel: "allow",
      proxy: process.env.NEXT_PUBLIC_DATADOG_INTAKE_PROXY_URL,
      enableExperimentalFeatures: ["clickmap"],
    });
    datadogRum.startSessionReplayRecording();
  }

  if (process.env.NEXT_PUBLIC_ENABLE_DATADOG_LOG === "true") {
    datadogLogs.init({
      clientToken: "pub2b81d142f3b7d50d24dabbc30a91a4d7",
      site: "datadoghq.eu",
      service: "onlydust-app",
      env: process.env.NEXT_PUBLIC_ENV,
      version: process.env.APP_COMMIT_HASH,
      forwardErrorsToLogs: true,
      proxy: process.env.NEXT_PUBLIC_DATADOG_INTAKE_PROXY_URL,
    });
  }
}
