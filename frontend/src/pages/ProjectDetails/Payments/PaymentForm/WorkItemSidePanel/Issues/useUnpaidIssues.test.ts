import { daysFromNow } from "src/utils/date";
import { buildQuery, IssueState, IssueType } from "./useUnpaidIssues";

describe("Issues", () => {
  it("should build the query properly for pull requests", () => {
    const query = buildQuery({
      repos: [
        { id: 545531678, owner: "sayajin-labs", name: "kakarot" },
        { id: 493591124, owner: "onlydustxyz", name: "kaaper" },
      ],
      author: "ofux",
      type: IssueType.PullRequest,
    });
    expect(query).toBe(
      `repo:sayajin-labs/kakarot repo:onlydustxyz/kaaper is:pr author:ofux created:>=${daysFromNow(60)
        .toISOString()
        .slice(0, 10)}`
    );
  });

  it("should build the query properly for merged pull requests", () => {
    const query = buildQuery({
      repos: [
        { id: 545531678, owner: "sayajin-labs", name: "kakarot" },
        { id: 493591124, owner: "onlydustxyz", name: "kaaper" },
      ],
      author: "ofux",
      type: IssueType.PullRequest,
      state: IssueState.Merged,
    });
    expect(query).toBe(
      `repo:sayajin-labs/kakarot repo:onlydustxyz/kaaper is:pr author:ofux is:merged created:>=${daysFromNow(60)
        .toISOString()
        .slice(0, 10)}`
    );
  });

  it("should build the query properly with minimum arguments", () => {
    const query = buildQuery({});
    expect(query).toBe(`created:>=${daysFromNow(60).toISOString().slice(0, 10)}`);
  });

  it("should build the query properly for issues", () => {
    const query = buildQuery({
      repos: [
        { id: 545531678, owner: "sayajin-labs", name: "kakarot" },
        { id: 493591124, owner: "onlydustxyz", name: "kaaper" },
      ],
      author: "ofux",
      type: IssueType.Issue,
    });
    expect(query).toBe(
      `repo:sayajin-labs/kakarot repo:onlydustxyz/kaaper is:issue author:ofux created:>=${daysFromNow(60)
        .toISOString()
        .slice(0, 10)}`
    );
  });
});
