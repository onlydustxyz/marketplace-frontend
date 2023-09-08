import { chain } from "lodash";
import { useMemo } from "react";
import {
  ContributionFragment,
  LiveGithubIssueCreatedAndClosedFragment,
  LiveGithubIssueFragment,
  LiveGithubPullRequestFragment,
  WorkItemType,
  useUnrewardedContributionsQuery,
} from "src/__generated/graphql";
import { WorkItem } from "src/components/GithubIssue";
import View from "./View";
import { useIgnoredContributions } from "./useIgnoredContributions";

type Props = {
  type: WorkItemType;
  projectId: string;
  contributorId: number;
  workItems: WorkItem[];
  addWorkItem: (workItem: WorkItem) => void;
};

export default function Issues({ type, projectId, contributorId, workItems, addWorkItem }: Props) {
  const { ignore: ignoreContribution, unignore: unignoreContribution } = useIgnoredContributions();

  const addAndUnignoreContribution = (contribution: ContributionFragment) => {
    const workItem = contributionToWorkItem(contribution);
    if (workItem.ignored) unignoreContribution(projectId, contribution.id!);
    addWorkItem(workItem);
  };

  const { data } = useUnrewardedContributionsQuery({
    variables: {
      projectId,
      githubUserId: contributorId,
      type,
    },
  });

  const contributionsNotAdded = useMemo(
    () => chain(data?.contributions).differenceBy(workItems, "id").value(),
    [data?.contributions, workItems]
  );

  return (
    <View
      projectId={projectId}
      contributions={contributionsNotAdded}
      type={type}
      addWorkItem={addWorkItem}
      addContribution={addAndUnignoreContribution}
      ignoreContribution={(contribution: ContributionFragment) => ignoreContribution(projectId, contribution.id!)}
      unignoreContribution={(contribution: ContributionFragment) => unignoreContribution(projectId, contribution.id!)}
    />
  );
}

// contribution details ID = work item ID
// + use type

const contributionToWorkItem = (props: ContributionFragment): WorkItem => ({
  // FIXME: this is a hack to make the types work
  ...props,
  id: props.detailsId || "",
  number: 0,
  title: "",
  htmlUrl: "",
  ignored: props.ignored || false,
  createdAt: new Date(),
});

export const issueToWorkItem = (props: LiveGithubIssueFragment): WorkItem => ({
  ...props,
  type: WorkItemType.Issue,
  // ignored: some(ignoredForProjects, { projectId }),
  ignored: false,
  id: props.id.toString(),
});

export const issueCreatedAndClosedToWorkItem = (
  issueCreatedAndClosedFragment: LiveGithubIssueCreatedAndClosedFragment
): WorkItem => ({
  ...issueCreatedAndClosedFragment,
  type: WorkItemType.Issue,
  ignored: false,
  id: issueCreatedAndClosedFragment.id.toString(),
});

export const pullRequestToWorkItem = (props: LiveGithubPullRequestFragment): WorkItem => ({
  ...props,
  type: WorkItemType.PullRequest,
  // ignored: some(ignoredForProjects, { projectId }),
  ignored: false,
  id: props.id.toString(),
});
