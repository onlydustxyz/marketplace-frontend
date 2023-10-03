import { parseFlag } from "./parseFlag";

describe("parseFlag", () => {
  it("should allow flag", () => {
    process.env.VITE_FLAG_TEST = "true";

    expect(parseFlag("VITE_FLAG_TEST")).toBe(true);
  });

  it("should deny flag", () => {
    process.env.VITE_FLAG_TEST = "false";

    expect(parseFlag("VITE_FLAG_TEST")).toBe(false);
  });

  it("should deny undefined flag", () => {
    expect(parseFlag("VITE_FLAG_TEST")).toBe(false);
  });
});

afterEach(() => {
  delete process.env.VITE_FLAG_TEST;
});
