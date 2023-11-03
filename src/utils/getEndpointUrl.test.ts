import { getEndpointUrl } from "./getEndpointUrl";

describe("getEndpointUrl", () => {
  it("should generate endpoint URL with pageIndex and pageSize", () => {
    const url = getEndpointUrl({
      resourcePath: "/api/v1/projects/{{id}}/contributors",
      pathParam: "123",
      queryParams: [["status", "active"]],
      pageParam: 2,
      pageSize: 10,
    });
    expect(url).toBe(
      "https://develop-api.onlydust.com/api/v1/projects/123/contributors?status=active&pageIndex=2&pageSize=10"
    );
  });

  it("should generate endpoint URL with multiple path params", () => {
    const url = getEndpointUrl({
      resourcePath: "/api/v1/projects/{{id}}/contributors/{{cId}}",
      pathParam: { id: "123", cId: "456" },
      queryParams: "status=inProgress",
    });
    expect(url).toBe("https://develop-api.onlydust.com/api/v1/projects/123/contributors/456?status=inProgress");
  });

  it("should generate endpoint URL with query param object", () => {
    const url = getEndpointUrl({
      resourcePath: "/api/v1/projects/{{id}}/contributors",
      pathParam: "123",
      queryParams: { status: "inProgress", bool: "true", number: "456" },
    });
    expect(url).toBe(
      "https://develop-api.onlydust.com/api/v1/projects/123/contributors?status=inProgress&bool=true&number=456"
    );
  });
});
