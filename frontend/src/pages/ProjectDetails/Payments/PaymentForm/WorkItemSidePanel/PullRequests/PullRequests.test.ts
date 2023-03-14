import { buildQuery } from ".";

describe("PullRequests", () => {
  it("should build the query properly", () => {
    const query = buildQuery(
      [
        { owner: "sayajin-labs", name: "kakarot" },
        { owner: "onlydustxyz", name: "kaaper" },
      ],
      "ofux"
    );
    expect(query).toBe("repo:sayajin-labs/kakarot repo:onlydustxyz/kaaper is:pr author:ofux");
  });
});
