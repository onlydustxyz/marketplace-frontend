import { getEndpointUrl } from "./getEndpointUrl";

describe("getEndpointUrl", () => {
  it("should generate endpoint URL correctly", () => {
    const url = getEndpointUrl({
      resourcePath: "/api/v1/projects/{{id}}/contributors",
      pathParam: "123",
      queryParams: [{ key: "status", value: ["active"] }],
      pageParam: 2,
      pageSize: 10,
    });
    expect(url).toBe("https://undefined/api/v1/projects/123/contributors?status=active&page_index=2&page_size=10");
  });
});
