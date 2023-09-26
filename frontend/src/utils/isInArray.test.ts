import { isInArray } from "./isInArray";

describe("isIn", () => {
  it("should find item", () => {
    expect(isInArray([1, 2, 3], 1)).toBe(true);
  });

  it("should not find item", () => {
    expect(isInArray([1, 2, 3], 4)).toBe(false);
  });
});
