export function parseFlag(flag: string) {
  const value = import.meta.env?.[flag] ?? "";

  return value.toLowerCase() === "true";
}
