import useFilteredWorkItems from "./useFilteredWorkItems";
import { WorkItem } from "src/components/GithubIssue";
import { Type, Status } from "src/__generated/graphql";

const workItemTemplate = {
  id: 1,
  type: Type.Issue,
  status: Status.Merged,
  htmlUrl: "",
  repoId: 1,
  closedAt: null,
  createdAt: null,
  mergedAt: null,
};

const workItems: WorkItem[] = [
  {
    number: 100,
    title: "foo bar",
    ...workItemTemplate,
  },
  {
    number: 150,
    title: "foo plop",
    ...workItemTemplate,
  },
  {
    number: 222,
    title: "croute",
    ...workItemTemplate,
  },
];

describe("Work items", () => {
  it("should not be filtered when pattern is empty", () => {
    const filteredWorkItems = useFilteredWorkItems({ workItems });
    expect(filteredWorkItems).toEqual(workItems);
  });

  it("should be filtered by number", () => {
    const filteredWorkItems = useFilteredWorkItems({ pattern: "15", workItems });
    expect(filteredWorkItems).toHaveLength(1);
    expect(filteredWorkItems[0].number).toEqual(150);
  });

  it("should be filtered by title", () => {
    const filteredWorkItems = useFilteredWorkItems({ pattern: "foo", workItems });
    expect(filteredWorkItems).toHaveLength(2);
    expect(filteredWorkItems[0].number).toEqual(100);
    expect(filteredWorkItems[1].number).toEqual(150);
  });

  it("should be filtered with logical AND", () => {
    const filteredWorkItems = useFilteredWorkItems({ pattern: "foo 5", workItems });
    expect(filteredWorkItems).toHaveLength(1);
    expect(filteredWorkItems[0].number).toEqual(150);
  });
});
