import { describe, expect, it } from "vitest";
import { deepCamelCase } from "./deepCamelCase";

describe("deepCamelCase", () => {
  it("should camelize all keys", () => {
    const testValue = {
      hello_cous_cous: {
        "hello-cous-cous": { HelloCousCous: 1 },
      },
      helloOnlyDust: 1,
    };

    const camelized = deepCamelCase(testValue);

    expect(camelized.helloCousCous.helloCousCous.helloCousCous).toBe(1);
    expect(camelized.helloOnlyDust).toBe(1);
  });

  it("should return value as is if not an object", () => {
    expect(deepCamelCase(1)).toBe(1);
    expect(deepCamelCase(false)).toBe(false);
    expect(deepCamelCase("")).toBe("");
    expect(deepCamelCase(null)).toBe(null);
    expect(deepCamelCase(undefined)).toBe(undefined);
    expect(deepCamelCase("toto")).toBe("toto");
  });

  it("should camelCase keys of collections", () => {
    const testValue = {
      hey_les_couscous: [{ coucous_royal: 3 }, { super_tajine: 2 }],
    };

    const camelized = deepCamelCase(testValue);

    expect(camelized.heyLesCouscous[0].coucousRoyal).toBe(3);
    expect(camelized.heyLesCouscous[1].superTajine).toBe(2);
  });
});
