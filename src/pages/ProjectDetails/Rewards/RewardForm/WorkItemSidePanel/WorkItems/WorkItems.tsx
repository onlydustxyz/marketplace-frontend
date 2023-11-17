import { chain } from "lodash";
import { useEffect, useMemo } from "react";
import { WorkItemFragment, WorkItemType } from "src/__generated/graphql";
import View from "./View";
import { useIgnoredContributions } from "./useIgnoredContributions";
import { useApolloClient } from "@apollo/client";
import useRewardableItemsQueryParams from "../hooks/useRewardableItemsQueryParams";
import ProjectApi from "src/api/Project";
import { RewardableItem } from "src/api/Project/queries";

type Props = {
  type: WorkItemType;
  projectId: string;
  contributorId: number;
  workItems: WorkItemFragment[];
  addWorkItem: (workItem: WorkItemFragment) => void;
};

export function WorkItems({ type, projectId, contributorId, workItems, addWorkItem }: Props) {
  const { queryParams, setType, setSearch, setIncludeIgnoredItems } = useRewardableItemsQueryParams({
    type,
    githubUserId: contributorId,
    includeIgnoredItems: false,
  });

  const {
    data: contributionItems,
    isLoading,
    isError,
  } = ProjectApi.queries.useRewardableItemsInfiniteList({
    params: { projectId, queryParams },
  });

  useEffect(() => {
    setType(type);
  }, [type]);

  const contributions = contributionItems?.pages.flatMap(({ rewardableItems }) => rewardableItems) ?? [];

  console.log("contributions", contributions);

  const client = useApolloClient();

  // const { data, refetch } = useUnrewardedContributionsByTypeQuery({
  //   fetchPolicy: "no-cache",
  //   variables: {
  //     projectId,
  //     githubUserId: contributorId,
  //     type,
  //   },
  // });

  const onRefetchContributions = async () => {
    // await client.refetchQueries({ include: [UnrewardedContributionsDocument] });
    // await refetch();
  };

  const { ignore: ignoreContribution, unignore: unignoreContribution } =
    useIgnoredContributions(onRefetchContributions);

  const addAndUnignoreContribution = (contribution: RewardableItem) => {
    if (contribution.ignored && contribution.id) unignoreContribution(projectId, contribution.id);
    const workItem = contributionToWorkItem(contribution);
    workItem && addWorkItem(workItem);
  };

  const contributionsNotAdded = useMemo(
    () =>
      chain(contributions)
        .differenceWith(workItems, (contribution, workItem) => contribution?.id === workItem.id)
        .value(),
    [contributions, workItems]
  );

  return (
    <View
      projectId={projectId}
      contributions={contributionsNotAdded}
      type={type}
      addWorkItem={addWorkItem}
      addContribution={addAndUnignoreContribution}
      contributorId={contributorId}
      ignoreContribution={(contribution: RewardableItem) =>
        contribution.id && ignoreContribution(projectId, contribution.id)
      }
      unignoreContribution={(contribution: RewardableItem) =>
        contribution.id && unignoreContribution(projectId, contribution.id)
      }
      setIncludeIgnoredItems={setIncludeIgnoredItems}
    />
  );
}

export const contributionToWorkItem = ({
  githubIssue,
  githubPullRequest,
  githubCodeReview,
}: RewardableItem): WorkItemFragment | undefined => {
  switch (true) {
    case !!githubIssue:
      return issueToWorkItem(githubIssue);
    case !!githubPullRequest:
      return pullRequestToWorkItem(githubPullRequest);
    case !!githubCodeReview:
      return codeReviewToWorkItem(githubCodeReview);
  }
};

export const issueToWorkItem = (issue: RewardableItem | null): WorkItemFragment => ({
  type: WorkItemType.Issue,
  id: issue?.id.toString(),
  githubIssue: issue,
  githubPullRequest: null,
  githubCodeReview: null,
});

export const pullRequestToWorkItem = (pullRequest: RewardableItem | null): WorkItemFragment => ({
  type: WorkItemType.PullRequest,
  id: pullRequest?.id.toString(),
  githubIssue: null,
  githubPullRequest: pullRequest,
  githubCodeReview: null,
});

export const codeReviewToWorkItem = (codeReview: RewardableItem | null): WorkItemFragment => ({
  type: WorkItemType.CodeReview,
  id: codeReview?.id || null,
  githubIssue: null,
  githubPullRequest: null,
  githubCodeReview: codeReview,
});
