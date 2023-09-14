import { chain } from "lodash";
import { useMemo } from "react";
import {
  ContributionFragment,
  GithubIssueFragment,
  GithubPullRequestFragment,
  LiveGithubIssueCreatedAndClosedFragment,
  LiveGithubIssueFragment,
  LiveGithubPullRequestFragment,
  WorkItemType,
  useUnrewardedContributionsQuery,
} from "src/__generated/graphql";
import View from "./View";
import { useIgnoredContributions } from "./useIgnoredContributions";
import { GithubIssue as GithubIssueType } from "src/components/GithubIssue";
import { GithubPullRequest as GithubPullRequestType } from "src/components/GithubPullRequest";

type Props = {
  type: WorkItemType;
  projectId: string;
  contributorId: number;
  workItems: (GithubIssueType | GithubPullRequestType)[];
  addWorkItem: (workItem: GithubIssueType | GithubPullRequestType) => void;
};

export default function Issues({ type, projectId, contributorId, workItems, addWorkItem }: Props) {
  const { ignore: ignoreContribution, unignore: unignoreContribution } = useIgnoredContributions();

  const addAndUnignoreContribution = (contribution: ContributionFragment) => {
    const workItem = contributionToWorkItem(contribution);
    if (workItem?.ignored) unignoreContribution(projectId, contribution.id!);
    workItem && addWorkItem(workItem);
  };

  const { data } = useUnrewardedContributionsQuery({
    variables: {
      projectId,
      githubUserId: contributorId,
      type: type.toLowerCase(),
    },
  });

  const contributionsNotAdded = useMemo(
    () =>
      chain(data?.contributions)
        .differenceWith(workItems, (contribution, workItem) => contribution.detailsId === workItem.id)
        .value(),
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

export const contributionToWorkItem = ({
  githubIssue,
  githubPullRequest,
}: ContributionFragment): GithubIssueType | GithubPullRequestType | undefined =>
  githubIssue ? issueToWorkItem(githubIssue) : githubPullRequest ? pullRequestToWorkItem(githubPullRequest) : undefined;

export const issueToWorkItem = (props: GithubIssueFragment | LiveGithubIssueFragment): GithubIssueType => ({
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

export const pullRequestToWorkItem = (props: GithubPullRequestFragment | LiveGithubPullRequestFragment): WorkItem => ({
  ...props,
  type: WorkItemType.PullRequest,
  // ignored: some(ignoredForProjects, { projectId }),
  ignored: false,
  id: props.id.toString(),
});
