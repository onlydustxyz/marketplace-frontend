import { buildQuery, IssueType } from "./useUnpaidIssues";

describe("Issues", () => {
  it("should build the query properly for pull requests", () => {
    const query = buildQuery(
      [
        { id: 545531678, owner: "sayajin-labs", name: "kakarot" },
        { id: 493591124, owner: "onlydustxyz", name: "kaaper" },
      ],
      "ofux",
      IssueType.PullRequest
    );
    expect(query).toBe("repo:sayajin-labs/kakarot repo:onlydustxyz/kaaper is:pr author:ofux");
  });

  it("should build the query properly for issues", () => {
    const query = buildQuery(
      [
        { id: 545531678, owner: "sayajin-labs", name: "kakarot" },
        { id: 493591124, owner: "onlydustxyz", name: "kaaper" },
      ],
      "ofux",
      IssueType.Issue
    );
    expect(query).toBe("repo:sayajin-labs/kakarot repo:onlydustxyz/kaaper is:issue author:ofux");
  });
});
