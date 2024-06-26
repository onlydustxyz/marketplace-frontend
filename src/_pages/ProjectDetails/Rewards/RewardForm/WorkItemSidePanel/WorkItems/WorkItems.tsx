import _ from "lodash";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";

import ProjectApi from "src/api/Project";
import { RewardableItem, useRewardableItemsQueryParams } from "src/api/Project/queries";
import { NotFound } from "src/components/NotFound";
import { usePooling, usePoolingFeedback } from "src/hooks/usePooling/usePooling";
import { WorkItemType } from "src/types";

import { useIntl } from "hooks/translate/use-translate";

import { Contributor } from "../../types";
import View, { tabNames } from "./View";
import { useIgnoredContributions } from "./useIgnoredContributions";

interface RewardableBase {
  id: string;
}

interface RewardableIssue extends RewardableBase {
  type: WorkItemType.Issue;
  githubIssue: RewardableItem;
  githubPullRequest?: never;
  githubCodeReview?: never;
}

interface RewardablePullRequest extends RewardableBase {
  type: WorkItemType.PullRequest;
  githubIssue?: never;
  githubPullRequest: RewardableItem;
  githubCodeReview?: never;
}

interface RewardableCodeReview extends RewardableBase {
  type: WorkItemType.CodeReview;
  githubIssue?: never;
  githubPullRequest?: never;
  githubCodeReview: RewardableItem;
}

export type RewardableWorkItem = RewardableIssue | RewardablePullRequest | RewardableCodeReview;

type Props = {
  type: WorkItemType;
  projectId: string;
  contributor: Contributor;
  workItems: RewardableWorkItem[];
  addWorkItem: (workItem: RewardableWorkItem) => void;
};

export function WorkItems({ type, projectId, workItems, addWorkItem, contributor }: Props) {
  const { T } = useIntl();

  const { watch } = useFormContext();
  const tabName = tabNames[type];
  const search = watch(`search-${tabName}`);

  const { queryParams, setIncludeIgnoredItems } = useRewardableItemsQueryParams({
    type,
    githubUserId: contributor.githubUserId,
    search,
    ignoredItemsIncluded: false,
  });

  const { refetchOnWindowFocus, refetchInterval, onRefetching, onForcePooling } = usePooling({
    limites: 4,
    delays: 3000,
  });

  const {
    data: contributionItems,
    isRefetching,
    isLoading,
    refetch,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = ProjectApi.queries.useRewardableItemsInfiniteList({
    params: { projectId, queryParams },
    options: { retry: 1, refetchOnWindowFocus, refetchInterval },
  });

  const PoolingFeedback = usePoolingFeedback({
    onForcePooling,
    isLoading,
    isRefetching,
    fetch: refetch,
    ui: {
      label: T("project.details.edit.syncContributions"),
    },
  });

  useEffect(() => {
    onRefetching(isRefetching);
  }, [isRefetching]);

  const contributions = contributionItems?.pages.flatMap(({ rewardableItems }) => rewardableItems) ?? [];

  const { ignore: ignoreContribution, unignore: unignoreContribution } = useIgnoredContributions(projectId);

  const addAndUnignoreContribution = (contribution: RewardableItem) => {
    if (contribution.ignored && contribution.contributionId) unignoreContribution(contribution.contributionId);
    const workItem = contributionToWorkItem(contribution);
    workItem && addWorkItem(workItem);
  };

  const contributionsNotAdded = useMemo(
    () =>
      _.chain(contributions)
        .differenceWith(workItems, (contribution, workItem) => contribution?.id === workItem.id)
        .value(),
    [contributions, workItems]
  );

  if (isError) {
    return <NotFound />;
  }

  return (
    <View
      projectId={projectId}
      contributions={contributionsNotAdded as RewardableItem[]}
      type={type}
      addWorkItem={addWorkItem}
      addContribution={addAndUnignoreContribution}
      contributor={contributor}
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
      PoolingFeedback={PoolingFeedback}
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

export const issueToWorkItem = (contribution: RewardableItem): RewardableWorkItem => ({
  type: WorkItemType.Issue,
  id: contribution.id,
  githubIssue: contribution,
});

export const pullRequestToWorkItem = (contribution: RewardableItem): RewardableWorkItem => ({
  type: WorkItemType.PullRequest,
  id: contribution.id,
  githubPullRequest: contribution,
});

export const codeReviewToWorkItem = (contribution: RewardableItem): RewardableWorkItem => ({
  type: WorkItemType.CodeReview,
  id: contribution.id,
  githubCodeReview: contribution,
});
