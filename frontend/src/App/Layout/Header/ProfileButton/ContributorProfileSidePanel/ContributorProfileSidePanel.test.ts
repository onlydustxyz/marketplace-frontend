import { parseWebsite } from "./View";

describe("parseWebsite", () => {
  it("should return the website hostname in best effort", () => {
    expect(parseWebsite(null)).toBeUndefined();
    expect(parseWebsite("http://google.com/test")).toBe("google.com");
    expect(parseWebsite("https://google.com/test")).toBe("google.com");
    expect(parseWebsite("http://google.com/")).toBe("google.com");
    expect(parseWebsite("http://google.com")).toBe("google.com");
    expect(parseWebsite("google.com/test")).toBe("google.com");
    expect(parseWebsite("ftp://google.com/test")).toBe("google.com");
    expect(parseWebsite("google.com/")).toBe("google.com");
    expect(parseWebsite("google.com")).toBe("google.com");
    expect(parseWebsite("google")).toBe("google");
    expect(parseWebsite("google/test")).toBe("google");
    expect(parseWebsite("google/")).toBe("google");
  });
});
