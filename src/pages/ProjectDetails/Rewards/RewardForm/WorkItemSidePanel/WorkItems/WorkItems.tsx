import { chain } from "lodash";
import { useMemo } from "react";
import { WorkItemType } from "src/__generated/graphql";
import View, { tabNames } from "./View";
import { useIgnoredContributions } from "./useIgnoredContributions";
import ProjectApi from "src/api/Project";
import { RewardableItem, useRewardableItemsQueryParams } from "src/api/Project/queries";
import { useFormContext } from "react-hook-form";

export interface RewardableWorkItem {
  type: WorkItemType.Issue | WorkItemType.PullRequest | WorkItemType.CodeReview;
  id: string;
  githubIssue: RewardableItem | null;
  githubPullRequest: RewardableItem | null;
  githubCodeReview: RewardableItem | null;
}

type Props = {
  type: WorkItemType;
  projectId: string;
  contributorId: number;
  workItems: RewardableWorkItem[];
  addWorkItem: (workItem: RewardableWorkItem) => void;
};

export function WorkItems({ type, projectId, contributorId, workItems, addWorkItem }: Props) {
  const { watch } = useFormContext();
  const tabName = tabNames[type];
  const search = watch(`search-${tabName}`);

  const { queryParams, setIncludeIgnoredItems } = useRewardableItemsQueryParams({
    type,
    githubUserId: contributorId,
    search,
    ignoredItemsIncluded: false,
  });

  const {
    data: contributionItems,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = ProjectApi.queries.useRewardableItemsInfiniteList({
    params: { projectId, queryParams },
  });

  const contributions = contributionItems?.pages.flatMap(({ rewardableItems }) => rewardableItems) ?? [];

  const { ignore: ignoreContribution, unignore: unignoreContribution } = useIgnoredContributions(projectId);

  const addAndUnignoreContribution = (contribution: RewardableItem) => {
    if (contribution.ignored && contribution.contributionId) unignoreContribution(contribution.contributionId);
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
      contributions={contributionsNotAdded as RewardableItem[]}
      type={type}
      addWorkItem={addWorkItem}
      addContribution={addAndUnignoreContribution}
      contributorId={contributorId}
      ignoreContribution={(contribution: RewardableItem) =>
        contribution.contributionId && ignoreContribution(contribution.contributionId)
      }
      unignoreContribution={(contribution: RewardableItem) =>
        contribution.contributionId && unignoreContribution(contribution.contributionId)
      }
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      setIncludeIgnoredItems={setIncludeIgnoredItems}
      loading={isLoading}
      error={isError}
    />
  );
}

export const contributionToWorkItem = (contribution: RewardableItem): RewardableWorkItem | undefined => {
  switch (contribution.type) {
    case WorkItemType.Issue:
      return issueToWorkItem(contribution);
    case WorkItemType.PullRequest:
      return pullRequestToWorkItem(contribution);
    case WorkItemType.CodeReview:
      return codeReviewToWorkItem(contribution);
  }
};

export const issueToWorkItem = (contribution: RewardableItem | null): RewardableWorkItem => ({
  type: WorkItemType.Issue,
  id: contribution?.id || "",
  githubIssue: contribution,
  githubPullRequest: null,
  githubCodeReview: null,
});

export const pullRequestToWorkItem = (contribution: RewardableItem | null): RewardableWorkItem => ({
  type: WorkItemType.PullRequest,
  id: contribution?.id || "",
  githubIssue: null,
  githubPullRequest: contribution,
  githubCodeReview: null,
});

export const codeReviewToWorkItem = (contribution: RewardableItem | null): RewardableWorkItem => ({
  type: WorkItemType.CodeReview,
  id: contribution?.id || "",
  githubIssue: null,
  githubPullRequest: null,
  githubCodeReview: contribution,
});
