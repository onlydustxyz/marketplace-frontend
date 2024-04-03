export function isInMaintenanceMode() {
  const envVar = process.env.NEXT_PUBLIC_MAINTENANCE;

  return {
    inMaintenance: envVar === "true",
  };
}
