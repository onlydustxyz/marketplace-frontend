import { getEndpointUrl } from "./getEndpointUrl";

describe("getEndpointUrl", () => {
  it("should generate endpoint URL correctly", () => {
    const url = getEndpointUrl({
      resourcePath: "/api/v1/projects/{{id}}/contributors",
      pathParam: "123",
      queryParams: { status: ["active"] },
      pageParam: 2,
      pageSize: 10,
    });
    expect(url).toBe(
      "https://develop-api.onlydust.com/api/v1/projects/123/contributors?status=active&pageIndex=2&pageSize=10"
    );
  });
});
