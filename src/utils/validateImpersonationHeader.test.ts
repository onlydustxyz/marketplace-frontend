import { validateImpersonationHeader } from "./validateImpersonationHeader";

describe("validateImpersonationHeader", () => {
  it("should return false as there is no header", () => {
    expect(validateImpersonationHeader("")).toEqual(false);
  });

  it("should return false as the header is invalid", () => {
    const invalidHeader = JSON.stringify({
      "x-hasura-user-id": "41b46107-9e4c-4e31-8acf-8371e4ca123a",
      "x-hasura-projectsLeaded": "{}",
      "x-hasura-githubUserId": "0",
      "x-hasura-githubAccessToken": "",
    });

    expect(validateImpersonationHeader(invalidHeader)).toEqual(false);
  });

  it("should return true as the header is valid", () => {
    const validHeader = JSON.stringify({
      "x-hasura-user-id": "41b46107-9e4c-4e31-8acf-8371e4ca123a",
      "x-hasura-projectsLeaded": "{}",
      "x-hasura-githubUserId": "2360414",
      "x-hasura-githubAccessToken": "gho_123456",
    });

    expect(validateImpersonationHeader(validHeader)).toEqual(true);
  });
});
