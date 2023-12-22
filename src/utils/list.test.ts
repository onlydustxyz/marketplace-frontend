import { describe, expect, it } from "vitest";
import { formatList } from "./list";

describe("List", () => {
  it("should be formatted in narrow style", () => {
    expect(formatList(["a", "b", "c"])).toBe("a, b, c");
  });
});
