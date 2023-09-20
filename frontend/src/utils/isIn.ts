/**
 * Ensure a value is included in an array and is correctly typed.
 * @param values
 * @param x
 * @returns boolean
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIn<T>(values: readonly T[], x: any): x is T {
  return values.includes(x);
}
