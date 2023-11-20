import transformInstallationToOrganization from "./transformInstallationToOrganization";

describe("transformInstallationToOrganization", () => {
  it("transforms valid input correctly", () => {
    const mockInput = {
      organization: {
        id: 123,
        login: "testorg",
        avatarUrl: "http://example.com/avatar",
        htmlUrl: "http://example.com",
        name: "Test Organization",
        installationId: 456,
        installed: true,
        repos: [
          {
            id: 1,
            owner: "testowner",
            name: "testrepo",
            htmlUrl: "http://example.com/repo",
            description: "A test repository",
          },
        ],
      },
      id: 456,
    };

    const expectedOutput = {
      id: 123,
      login: "testorg",
      avatarUrl: "http://example.com/avatar",
      htmlUrl: "http://example.com",
      name: "Test Organization",
      installationId: 456,
      installed: true,
      repos: [
        {
          id: 1,
          owner: "testowner",
          name: "testrepo",
          htmlUrl: "http://example.com/repo",
          description: "A test repository",
          stars: 0,
          forkCount: 0,
          hasIssues: false,
          isIncludedInProject: undefined,
        },
      ],
    };

    expect(transformInstallationToOrganization(mockInput)).toEqual(expectedOutput);
  });

  it("returns undefined for undefined input", () => {
    expect(transformInstallationToOrganization(undefined)).toBeUndefined();
  });
});
