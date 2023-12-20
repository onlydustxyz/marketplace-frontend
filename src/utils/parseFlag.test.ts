import { parseFlag } from "./parseFlag";

describe("parseFlag", () => {
  it("should allow flag", () => {
    process.env.NEXT_PUBLIC_FLAG_TEST = "true";

    expect(parseFlag("NEXT_PUBLIC_FLAG_TEST")).toBe(true);
  });

  it("should deny flag", () => {
    process.env.NEXT_PUBLIC_FLAG_TEST = "false";

    expect(parseFlag("NEXT_PUBLIC_FLAG_TEST")).toBe(false);
  });

  it("should deny undefined flag", () => {
    expect(parseFlag("NEXT_PUBLIC_FLAG_TEST")).toBe(false);
  });
});

afterEach(() => {
  delete process.env.NEXT_PUBLIC_FLAG_TEST;
});
