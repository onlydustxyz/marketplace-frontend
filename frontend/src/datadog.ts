import { datadogRum } from "@datadog/browser-rum";

declare global {
  const APP_COMMIT_HASH: string;
}

if (import.meta.env.VITE_ENV && import.meta.env.VITE_ENABLE_DATADOG_RUM === "true") {
  datadogRum.init({
    applicationId: "e6ac7edb-ca74-4ef7-9cb7-1ae8bea27db4",
    clientToken: "pub2b81d142f3b7d50d24dabbc30a91a4d7",
    site: "datadoghq.eu",
    service: "onlydust-app",
    env: import.meta.env.VITE_ENV,
    version: APP_COMMIT_HASH,
    sessionSampleRate: Number(import.meta.env.VITE_DATADOG_RUM_SAMPLE_RATE) || 100,
    sessionReplaySampleRate: Number(import.meta.env.VITE_DATADOG_RUM_REPLAY_SAMPLE_RATE) || 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: "allow",
  });

  datadogRum.startSessionReplayRecording();
}
