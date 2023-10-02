import { formatList } from "./list";

describe("List", () => {
  it("should be formatted in narrow style", () => {
    expect(formatList(["a", "b", "c"])).toBe("a, b, c");
  });
});
