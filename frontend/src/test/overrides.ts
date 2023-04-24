import config from "src/config";

async function importAndSetupFakeClock(currentTime: string) {
  const { setupFakeClock } = await import("./fake-clock");
  setupFakeClock(currentTime);
}

if (config.FAKE_TIME) {
  importAndSetupFakeClock(config.FAKE_TIME);
}
