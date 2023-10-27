import { parseWebsite } from "./utils";

describe("parseWebsite", () => {
  it("should return the website hostname in best effort", () => {
    expect(parseWebsite(undefined)).toBeUndefined();
    expect(parseWebsite("http://google.com/test")?.hostname).toBe("google.com");
    expect(parseWebsite("https://google.com/test")?.hostname).toBe("google.com");
    expect(parseWebsite("http://google.com/")?.hostname).toBe("google.com");
    expect(parseWebsite("http://google.com")?.hostname).toBe("google.com");
    expect(parseWebsite("google.com/test")?.hostname).toBe("google.com");
    expect(parseWebsite("google.com/")?.hostname).toBe("google.com");
    expect(parseWebsite("google.com")?.hostname).toBe("google.com");
    expect(parseWebsite("google")?.hostname).toBe("google");
    expect(parseWebsite("google/test")?.hostname).toBe("google");
    expect(parseWebsite("google/")?.hostname).toBe("google");
  });

  it("should return a valid URL in best effort", () => {
    expect(parseWebsite("http://google.com/test")?.url).toBe("http://google.com/test");
    expect(parseWebsite("https://google.com/test")?.url).toBe("https://google.com/test");
    expect(parseWebsite("http://google.com/")?.url).toBe("http://google.com/");
    expect(parseWebsite("http://google.com")?.url).toBe("http://google.com/");
    expect(parseWebsite("google.com/test")?.url).toBe("https://google.com/test");
    expect(parseWebsite("google.com/")?.url).toBe("https://google.com/");
    expect(parseWebsite("google.com")?.url).toBe("https://google.com");
    expect(parseWebsite("google")?.url).toBe("https://google");
    expect(parseWebsite("google/test")?.url).toBe("https://google/test");
    expect(parseWebsite("google/")?.url).toBe("https://google/");
  });
});
