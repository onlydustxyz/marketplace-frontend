import { isIn } from "./isIn";

describe("isIn", () => {
  it("should find item", () => {
    expect(isIn([1, 2, 3], 1)).toBe(true);
  });

  it("should not find item", () => {
    expect(isIn([1, 2, 3], 4)).toBe(false);
  });
});
