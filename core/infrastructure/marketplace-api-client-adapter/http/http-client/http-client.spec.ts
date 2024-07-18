import { describe, expect, it } from "vitest";

import { HttpClient } from "./http-client";

describe("HttpClient.buildTag", () => {
  it("builds tag with only path", () => {
    const tag = HttpClient.buildTag({ path: "/users", pathParams: undefined, queryParams: undefined });
    expect(tag).toEqual("/users--");
  });

  it("builds tag with path and pathParams", () => {
    const tag = HttpClient.buildTag({ path: "/users/:userId", pathParams: { userId: "123" }, queryParams: undefined });
    expect(tag).toEqual('/users/:userId-{"userId":"123"}-');
  });

  it("builds tag with path and queryParams", () => {
    const tag = HttpClient.buildTag({ path: "/users", pathParams: undefined, queryParams: { active: true } });
    expect(tag).toEqual('/users--{"active":true}');
  });

  it("builds tag with path, pathParams, and queryParams", () => {
    const tag = HttpClient.buildTag({
      path: "/users/:userId",
      pathParams: { userId: "123" },
      queryParams: { active: true },
    });
    expect(tag).toEqual('/users/:userId-{"userId":"123"}-{"active":true}');
  });

  it("builds tag correctly when queryParams is an array", () => {
    const tag = HttpClient.buildTag({
      path: "/users",
      pathParams: undefined,
      queryParams: { ids: ["123", "456"] },
    });
    expect(tag).toEqual('/users--{"ids":["123","456"]}');
  });

  it("builds tag correctly when pathParams and queryParams are empty objects", () => {
    const tag = HttpClient.buildTag({ path: "/users", pathParams: {}, queryParams: {} });
    expect(tag).toEqual("/users-{}-{}");
  });
});
