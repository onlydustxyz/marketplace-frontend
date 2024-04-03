import { describe, expect, it } from "vitest";

import { isInMaintenanceMode } from "./maintenance";

describe("isInMaintenanceMode", () => {
  it("should return false when NEXT_PUBLIC_MAINTENANCE is not set", () => {
    process.env.NEXT_PUBLIC_MAINTENANCE = undefined;
    const result = isInMaintenanceMode();
    expect(result.inMaintenance).toBe(false);
  });

  it("should return false when NEXT_PUBLIC_MAINTENANCE is set to 'false'", () => {
    process.env.NEXT_PUBLIC_MAINTENANCE = "false";
    const result = isInMaintenanceMode();
    expect(result.inMaintenance).toBe(false);
  });

  it("should return true when NEXT_PUBLIC_MAINTENANCE is set to 'true'", () => {
    process.env.NEXT_PUBLIC_MAINTENANCE = "true";
    const result = isInMaintenanceMode();
    expect(result.inMaintenance).toBe(true);
  });
});
