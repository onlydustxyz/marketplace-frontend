import { chain } from "lodash";
import { useMemo } from "react";
import {
  ContributionFragment,
  GithubCodeReviewFragment,
  GithubIssueFragment,
  GithubPullRequestWithCommitsFragment,
  UnrewardedContributionsDocument,
  WorkItemFragment,
  WorkItemType,
  useUnrewardedContributionsByTypeQuery,
} from "src/__generated/graphql";
import View from "./View";
import { useIgnoredContributions } from "./useIgnoredContributions";
import { useApolloClient } from "@apollo/client";

type Props = {
  type: WorkItemType;
  projectId: string;
  contributorId: number;
  workItems: WorkItemFragment[];
  addWorkItem: (workItem: WorkItemFragment) => void;
};

export function WorkItems({ type, projectId, contributorId, workItems, addWorkItem }: Props) {
  const client = useApolloClient();

  const { data, refetch } = useUnrewardedContributionsByTypeQuery({
    fetchPolicy: "no-cache",
    variables: {
      projectId,
      githubUserId: contributorId,
      type,
    },
  });

  const onRefetchContributions = async () => {
    await client.refetchQueries({ include: [UnrewardedContributionsDocument] });
    await refetch();
  };

  const { ignore: ignoreContribution, unignore: unignoreContribution } =
    useIgnoredContributions(onRefetchContributions);

  const addAndUnignoreContribution = (contribution: ContributionFragment) => {
    if (contribution.ignored && contribution.id) unignoreContribution(projectId, contribution.id);
    const workItem = contributionToWorkItem(contribution);
    workItem && addWorkItem(workItem);
  };

  const contributionsNotAdded = useMemo(
    () =>
      chain(data?.contributions)
        .differenceWith(workItems, (contribution, workItem) => contribution.detailsId === workItem.id)
        .value()
        .filter(contribution => contribution.status === "complete"),
    [data?.contributions, workItems]
  );

  return (
    <View
      projectId={projectId}
      contributions={contributionsNotAdded}
      type={type}
      addWorkItem={addWorkItem}
      addContribution={addAndUnignoreContribution}
      contributorId={contributorId}
      ignoreContribution={(contribution: ContributionFragment) =>
        contribution.id && ignoreContribution(projectId, contribution.id)
      }
      unignoreContribution={(contribution: ContributionFragment) =>
        contribution.id && unignoreContribution(projectId, contribution.id)
      }
    />
  );
}

export const contributionToWorkItem = ({
  githubIssue,
  githubPullRequest,
  githubCodeReview,
}: ContributionFragment): WorkItemFragment | undefined => {
  switch (true) {
    case !!githubIssue:
      return issueToWorkItem(githubIssue);
    case !!githubPullRequest:
      return pullRequestToWorkItem(githubPullRequest);
    case !!githubCodeReview:
      return codeReviewToWorkItem(githubCodeReview);
  }
};

export const issueToWorkItem = (issue: GithubIssueFragment | null): WorkItemFragment => ({
  type: WorkItemType.Issue,
  id: issue?.id.toString(),
  githubIssue: issue,
  githubPullRequest: null,
  githubCodeReview: null,
});

export const pullRequestToWorkItem = (pullRequest: GithubPullRequestWithCommitsFragment | null): WorkItemFragment => ({
  type: WorkItemType.PullRequest,
  id: pullRequest?.id.toString(),
  githubIssue: null,
  githubPullRequest: pullRequest,
  githubCodeReview: null,
});

export const codeReviewToWorkItem = (codeReview: GithubCodeReviewFragment | null): WorkItemFragment => ({
  type: WorkItemType.CodeReview,
  id: codeReview?.id || null,
  githubIssue: null,
  githubPullRequest: null,
  githubCodeReview: codeReview,
});
