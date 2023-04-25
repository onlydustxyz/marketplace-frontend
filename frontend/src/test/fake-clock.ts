import sinon from "sinon";

export function setupFakeClock(currentTime: string) {
  sinon.useFakeTimers({ now: new Date(currentTime), shouldAdvanceTime: true, advanceTimeDelta: 20 });
}
