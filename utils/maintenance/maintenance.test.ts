import { describe, expect, it } from "vitest";

import { isInMaintenanceMode } from "./maintenance";

describe("isInMaintenanceMode", () => {
  it("should return false when NEXT_PUBLIC_MAINTENANCE is not set", () => {
    process.env.NEXT_PUBLIC_MAINTENANCE = undefined;
    const result = isInMaintenanceMode();
    expect(result.inMaintenance).toBe(false);
    expect(result.endsAt).toBe(undefined);
  });

  it("should return false when NEXT_PUBLIC_MAINTENANCE is set to anything but valid datetime string", () => {
    process.env.NEXT_PUBLIC_MAINTENANCE = "";
    const result = isInMaintenanceMode();
    expect(result.inMaintenance).toBe(false);
    expect(result.endsAt).toBe(undefined);
  });

  it("should return true when NEXT_PUBLIC_MAINTENANCE is set to 'true'", () => {
    process.env.NEXT_PUBLIC_MAINTENANCE = "2024-04-10T15:00:00Z";
    const result = isInMaintenanceMode();
    expect(result.inMaintenance).toBe(true);
    expect(result.endsAt).toStrictEqual(new Date("2024-04-10T15:00:00Z"));
  });
});
