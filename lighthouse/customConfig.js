const DESKTOP_THROTTLING_CONSTANTS = {
  rttMs: 40,
  throughputKbps: 10 * 1024,
  cpuSlowdownMultiplier: 1,
  requestLatencyMs: 0, // 0 means unset
  downloadThroughputKbps: 0,
  uploadThroughputKbps: 0,
};

const DESKTOP_EMULATION_METRICS = {
  mobile: false,
  width: 1350,
  height: 940,
  deviceScaleFactor: 1,
  disabled: false,
};

const DESKTOP_USERAGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4695.0 Safari/537.36 Chrome-Lighthouse"; // eslint-disable-line max-len

module.exports = {
  extends: "lighthouse:default",
  settings: {
    //    maxWaitForFcp: 15 * 1000,
    //    maxWaitForLoad: 35 * 1000,
    formFactor: "desktop",
    //    throttling: DESKTOP_THROTTLING_CONSTANTS,
    screenEmulation: DESKTOP_EMULATION_METRICS,
    emulatedUserAgent: DESKTOP_USERAGENT,
    // Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
    skipAudits: ["uses-http2"],
  },
};
