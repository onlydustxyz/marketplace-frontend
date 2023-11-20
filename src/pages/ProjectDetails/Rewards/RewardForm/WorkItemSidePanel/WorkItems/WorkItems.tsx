import { chain } from "lodash";
import { useEffect, useMemo } from "react";
import { WorkItemType } from "src/__generated/graphql";
import View from "./View";
import { useIgnoredContributions } from "./useIgnoredContributions";
import useRewardableItemsQueryParams from "../hooks/useRewardableItemsQueryParams";
import ProjectApi from "src/api/Project";
import { RewardableItem } from "src/api/Project/queries";

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

  // const client = useApolloClient();

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
      contributions={contributionsNotAdded as RewardableItem[]}
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
