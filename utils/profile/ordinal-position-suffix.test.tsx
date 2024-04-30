import { getOrdinalSuffix } from "utils/profile/ordinal-position-suffix";
import { describe, expect, it } from "vitest";

describe("getOrdinalSuffix", () => {
  it('returns "st" for numbers ending in 1 (excluding 11)', () => {
    expect(getOrdinalSuffix(1)).toBe("1st");
    expect(getOrdinalSuffix(21)).toBe("21st");
    expect(getOrdinalSuffix(101)).toBe("101st");
    expect(getOrdinalSuffix(111)).toBe("111th");
  });

  it('returns "nd" for numbers ending in 2 (excluding 12)', () => {
    expect(getOrdinalSuffix(2)).toBe("2nd");
    expect(getOrdinalSuffix(22)).toBe("22nd");
    expect(getOrdinalSuffix(102)).toBe("102nd");
    expect(getOrdinalSuffix(112)).toBe("112th");
  });

  it('returns "rd" for numbers ending in 3 (excluding 13)', () => {
    expect(getOrdinalSuffix(3)).toBe("3rd");
    expect(getOrdinalSuffix(23)).toBe("23rd");
    expect(getOrdinalSuffix(103)).toBe("103rd");
    expect(getOrdinalSuffix(113)).toBe("113th");
  });

  it('returns "th" for numbers ending in 0, 4-9, and all numbers ending in 11-13', () => {
    expect(getOrdinalSuffix(0)).toBe("0th");
    expect(getOrdinalSuffix(4)).toBe("4th");
    expect(getOrdinalSuffix(25)).toBe("25th");
    expect(getOrdinalSuffix(11)).toBe("11th");
    expect(getOrdinalSuffix(12)).toBe("12th");
    expect(getOrdinalSuffix(13)).toBe("13th");
    expect(getOrdinalSuffix(114)).toBe("114th");
  });
});
