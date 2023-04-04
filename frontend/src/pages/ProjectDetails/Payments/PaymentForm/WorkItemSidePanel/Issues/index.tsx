import { differenceBy } from "lodash";
import { useMemo } from "react";
import { WorkItem } from "src/components/GithubIssue";
import IssuesView from "./IssuesView";
import PullRequestsView from "./PullRequestsView";
import useUnpaidIssues, { IssueType } from "./useUnpaidIssues";

type Props = {
  type: IssueType;
  projectId: string;
  contributorHandle: string;
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export const MAX_ISSUE_COUNT = 50;

export default function Issues({ type, projectId, contributorHandle, workItems, onWorkItemAdded }: Props) {
  const { data: unpaidIssues, loading } = useUnpaidIssues({ projectId, filters: { author: contributorHandle, type } });

  const issues: WorkItem[] = useMemo(
    () => differenceBy(unpaidIssues, workItems, "id").slice(0, MAX_ISSUE_COUNT),
    [unpaidIssues, workItems]
  );

  return (
    <>
      {type === IssueType.PullRequest && (
        <PullRequestsView
          workItems={issues}
          onWorkItemAdded={onWorkItemAdded}
          query={{
            data: unpaidIssues,
            loading,
          }}
          isMore={unpaidIssues ? issues.length > unpaidIssues.length : false}
        />
      )}
      {type === IssueType.Issue && (
        <IssuesView
          workItems={issues}
          onWorkItemAdded={onWorkItemAdded}
          query={{
            data: unpaidIssues,
            loading,
          }}
          isMore={unpaidIssues ? issues.length > unpaidIssues.length : false}
        />
      )}
    </>
  );
}
