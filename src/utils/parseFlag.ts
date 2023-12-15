export function parseFlag(flag: string) {
  const value = process.env?.[flag] ?? "";

  return value.toLowerCase() === "true";
}
