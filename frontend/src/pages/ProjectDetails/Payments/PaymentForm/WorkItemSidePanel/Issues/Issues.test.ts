import { buildQuery, IssueType } from ".";

describe("Issues", () => {
  it("should build the query properly for pull requests", () => {
    const query = buildQuery(
      [
        { owner: "sayajin-labs", name: "kakarot" },
        { owner: "onlydustxyz", name: "kaaper" },
      ],
      "ofux",
      IssueType.PullRequest
    );
    expect(query).toBe("repo:sayajin-labs/kakarot repo:onlydustxyz/kaaper is:pr author:ofux");
  });

  it("should build the query properly for issues", () => {
    const query = buildQuery(
      [
        { owner: "sayajin-labs", name: "kakarot" },
        { owner: "onlydustxyz", name: "kaaper" },
      ],
      "ofux",
      IssueType.Issue
    );
    expect(query).toBe("repo:sayajin-labs/kakarot repo:onlydustxyz/kaaper is:issue author:ofux");
  });
});
