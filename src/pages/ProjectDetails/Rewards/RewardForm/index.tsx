import { useForm, FormProvider } from "react-hook-form";
import { Contributor, Inputs } from "./types";
import { useCallback, useState } from "react";
import { useIntl } from "src/hooks/useIntl";
import View from "./View";
import { useShowToaster } from "src/hooks/useToaster";
import { generatePath, useNavigate, useOutletContext } from "react-router-dom";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import { ProjectBudgetType } from "src/pages/ProjectDetails/Rewards/RemainingBudget/RemainingBudget";
import { useMutationRestfulData, useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import Loader from "src/components/Loader";
import { useLocalStorage } from "usehooks-ts";
import { reorderBudgets } from "./utils";
import { BudgetCurrencyType } from "src/utils/money";
import ErrorFallback from "src/ErrorFallback";
import { useApolloClient } from "@apollo/client";
import { useQueryClient } from "@tanstack/react-query";
import MeApi from "src/api/me";
import { RewardableItem } from "src/api/Project/queries";
import { RewardableWorkItem } from "./WorkItemSidePanel/WorkItems/WorkItems";

const RewardForm: React.FC = () => {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const client = useApolloClient();

  const { projectId, projectKey } = useOutletContext<{
    projectId: string;
    projectKey: string;
  }>();

  const {
    data: projectBudget,
    isLoading: isBudgetLoading,
    isError: isBudgetError,
    refetch,
  } = useRestfulData<ProjectBudgetType>({
    resourcePath: ApiResourcePaths.GET_PROJECT_BUDGETS,
    pathParam: { projectId },
    method: "GET",
  });

  const { mutate: createProjectReward, isPending: isCreateProjectRewardLoading } = useMutationRestfulData({
    resourcePath: ApiResourcePaths.PROJECT_REWARDS,
    pathParam: projectId,
    method: "POST",
    onSuccess: async () => {
      try {
        await refetch();
        showToaster(T("reward.form.sent"));
        // refetch PaymentRequests to display MyRewards
        queryClient.invalidateQueries({ queryKey: MeApi.tags.all });
        await client.refetchQueries({ include: ["GetPaymentRequestIds"] });
        navigate(generatePath(RoutePaths.ProjectDetails, { projectKey }) + "/" + ProjectRoutePaths.Rewards);
      } catch (e) {
        console.error(e);
      }
    },
  });

  const [preferredCurrency, setPreferredCurrency] = useLocalStorage<BudgetCurrencyType | undefined>(
    `preferredCurrency-${projectId}`,
    undefined
  );

  const formMethods = useForm<Inputs>({
    defaultValues: {
      remainingBudget: projectBudget?.remainingDollarsEquivalent,
      contributorHandle: null,
    },
    mode: "all",
  });

  const [contributor, setContributor] = useState<Contributor | null | undefined>(null);

  // const { queryParams } = useRewardableItemsQueryParams({
  //   githubUserId: contributor?.githubUserId,
  //   ignoredItemsIncluded: true,
  // });

  // // TODO waiting for new endpoint or fix the current one
  // const {
  //   data: contributionItems,
  //   // isLoading,
  //   // isError,
  // } = ProjectApi.queries.useRewardableItemsInfiniteList({
  //   // WE need to fetch all the contributions to be able to AUTO-ADD them all in one click
  //   // It's the reason that we set pageSize to 1000 assuming that there will never be more than 1000 contributions
  //   // and in the case there are more than 1000 contributions, we assume this limitation for performance reasons
  //   params: { projectId, queryParams, pageSize: 1000 },
  //   options: { enabled: !!contributor?.githubUserId },
  // });

  // const contributions = contributionItems?.pages.flatMap(({ rewardableItems }) => rewardableItems) ?? [];

  const rewardableItemsMock = [
    {
      number: 1392,
      id: "1595848551",
      contributionId: "ccbcacde99dbee0b44650add5b6409a95e2c90cd74643515a4e206c4b6de4b5f",
      title: "Add disable button on the table fallback for rewards",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1392",
      createdAt: "2023-06-07T02:10:00Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-11-11T16:23:20Z",
      repoName: "marketplace-frontend",
      type: "ISSUE",
      commitsCount: 2,
      userCommitsCount: 2,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "OPEN",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1386,
      id: "1592997612",
      contributionId: "9006641228814cb81ab4dd3e3129c77eb8161b1092b756bdac2e09173c2c9763",
      title: "E 826 allow users to create a project sticky UI",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1386",
      createdAt: "2023-10-30T03:30:00Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-11-02T18:26:40Z",
      repoName: "marketplace-frontend",
      type: "PULL_REQUEST",
      commitsCount: 2,
      userCommitsCount: 2,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "COMPLETED",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1384,
      id: "1590670633",
      contributionId: "dccd0fe23678a049a5e518153ab91581d92ab52ba55b37ca7407df90656106fc",
      title: "E-841 Front fixies",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1384",
      createdAt: "2023-10-06T05:03:20Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-10-16T21:43:20Z",
      repoName: "marketplace-frontend",
      type: "ISSUE",
      commitsCount: 2,
      userCommitsCount: 2,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "COMPLETED",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1374,
      id: "1586309104",
      contributionId: "3f054e56f833a12b26ec0e384caf128bc9a1139d641bbf4f4e117b155b6b53fb",
      title: "remove cache on contributor",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1374",
      createdAt: "2023-12-26T21:56:40Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-12-27T04:53:20Z",
      repoName: "marketplace-frontend",
      type: "PULL_REQUEST",
      commitsCount: 1,
      userCommitsCount: 1,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "COMPLETED",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1371,
      id: "1585977541",
      contributionId: "3ff3c3e1eeef6efd54d032e4a8be04b3350fcb0ba1f33a70fdfae90bbf809806",
      title: "Multi currency qa 04",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1371",
      createdAt: "2023-08-17T23:43:20Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-08-23T10:33:20Z",
      repoName: "marketplace-frontend",
      type: "ISSUE",
      commitsCount: 2,
      userCommitsCount: 2,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "COMPLETED",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1368,
      id: "1585826954",
      contributionId: "6105b0cc4a40ca35fa1c10c46e22a20574d178f4277a6665c0f0cd8bdc1d3aaa",
      title: "WIP react query structure",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1368",
      createdAt: "2023-06-13T04:00:00Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-07-06T13:06:40Z",
      repoName: "marketplace-frontend",
      type: "ISSUE",
      commitsCount: 2,
      userCommitsCount: 2,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "COMPLETED",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1366,
      id: "1585610330",
      contributionId: "0091cd2cfd480c2b48e632a54f352d8c4ea06b1907a24ec863f3af153245de43",
      title: "FIX QA 03",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1366",
      createdAt: "2023-03-11T18:53:20Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-07-30T10:10:00Z",
      repoName: "marketplace-frontend",
      type: "PULL_REQUEST",
      commitsCount: 15,
      userCommitsCount: 4,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "COMPLETED",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1363,
      id: "1584792928",
      contributionId: "e8b4c63f91391f948cfe425b23cfeb18fb3191642e3bc16e4ad630a7f99e9e7b",
      title: "QA 03",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1363",
      createdAt: "2023-06-28T18:00:00Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-07-28T04:40:00Z",
      repoName: "marketplace-frontend",
      type: "ISSUE",
      commitsCount: 4,
      userCommitsCount: 1,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "COMPLETED",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1357,
      id: "1584555272",
      contributionId: "c7db3d5c25acf782711f685d0778f9dada763e19a5daf3de80504fcb2513368b",
      title: "Fix multicurrency qa 02",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1357",
      createdAt: "2023-03-26T17:03:20Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-04-20T04:33:20Z",
      repoName: "marketplace-frontend",
      type: "PULL_REQUEST",
      commitsCount: 18,
      userCommitsCount: 6,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "COMPLETED",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1351,
      id: "1581234497",
      contributionId: "6075aabb87a5208f925c6235cf1f577eded54764b9f17daa03b9a8d60e5285dd",
      title: "Multi currencies QA 01",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1351",
      createdAt: "2023-10-15T20:43:20Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-01-13T21:16:40Z",
      repoName: "marketplace-frontend",
      type: "CODE_REVIEW",
      commitsCount: 12,
      userCommitsCount: 4,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "COMPLETED",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1346,
      id: "1580555902",
      contributionId: "cbc20d3e52d0d4b42f70b394718256576d0609eeb68b37af43c660c05e274839",
      title: "Allow sending rewards using multiple currencies - fixies",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1346",
      createdAt: "2023-01-27T03:20:00Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-10-10T15:10:00Z",
      repoName: "marketplace-frontend",
      type: "PULL_REQUEST",
      commitsCount: 15,
      userCommitsCount: 15,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "OPEN",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1345,
      id: "1580494035",
      contributionId: "e879da96cbcd85df1a4ad5d8fddc19a1f94df90add79d0af39ac8f1478d0dd88",
      title: "Currency component - E-696 && E-695",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1345",
      createdAt: "2023-01-02T17:46:40Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-07-16T19:26:40Z",
      repoName: "marketplace-frontend",
      type: "CODE_REVIEW",
      commitsCount: 6,
      userCommitsCount: 6,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "COMPLETED",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1340,
      id: "1579218309",
      contributionId: "d306d5a07d5cf015cac424eec644dbbc728f35a1e562acf6b037cce05489735e",
      title: "Fix style on the dollar conversion in budget component",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1340",
      createdAt: "2023-11-29T12:06:40Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-12-03T09:43:20Z",
      repoName: "marketplace-frontend",
      type: "PULL_REQUEST",
      commitsCount: 1,
      userCommitsCount: 1,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "COMPLETED",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1339,
      id: "1579207238",
      contributionId: "a32f8dab9f5707003b712ba08c35d3939a044ef5e468a8c7b6464726c5068f6e",
      title: "Fix z index on reward budget component",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1339",
      createdAt: "2023-11-25T23:40:00Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-12-03T11:56:40Z",
      repoName: "marketplace-frontend",
      type: "PULL_REQUEST",
      commitsCount: 1,
      userCommitsCount: 1,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "COMPLETED",
      ignored: false,
      htmlUrl: "",
    },
    {
      number: 1336,
      id: "1578832699",
      contributionId: "53f96397c824719c89840a8a303dea1dd0ba9015800234db9ed628c835ca6170",
      title: "Feat/work estimation",
      githubUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1336",
      createdAt: "2023-07-13T00:20:00Z",
      mergedAt: "2023-06-07T02:10:00Z",
      submittedAt: "2023-06-07T02:10:00Z",
      closedAt: "2023-06-07T02:10:00Z",
      completedAt: "2023-06-07T02:10:00Z",
      lastUpdateAt: "2023-11-19T14:36:40Z",
      repoName: "marketplace-frontend",
      type: "CODE_REVIEW",
      commitsCount: 37,
      userCommitsCount: 26,
      commentsCount: 7,
      codeReviewOutcome: "APPROVED",
      status: "COMPLETED",
      ignored: false,
      htmlUrl: "",
    },
  ];

  const contributions = rewardableItemsMock;

  const { handleSubmit } = formMethods;

  const onValidSubmit = (formData: Inputs) => {
    if (contributor) {
      createProjectReward(mapFormDataToVariables({ ...formData, contributor }));
      setPreferredCurrency(formData.currency);
    }
  };

  const onWorkItemsChange = useCallback(
    (workItems: RewardableWorkItem[]) =>
      formMethods.setValue(
        "workItems",
        workItems.map(workItem => {
          return {
            id: workItem.id || "",
            repoId:
              Number(workItem.githubIssue?.id) ||
              Number(workItem.githubPullRequest?.id) ||
              Number(workItem.githubCodeReview?.id) ||
              0,
            number:
              workItem.githubIssue?.number ||
              workItem.githubPullRequest?.number ||
              workItem.githubCodeReview?.number ||
              0,

            type: workItem.type,
          };
        })
      ),
    [formMethods]
  );

  if (isBudgetError) {
    return <ErrorFallback />;
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onValidSubmit)}
          className="flex w-full flex-col justify-between gap-6"
        >
          {!isBudgetLoading && projectBudget?.remainingDollarsEquivalent && projectBudget?.initialDollarsEquivalent ? (
            <View
              projectBudget={reorderBudgets(projectBudget)}
              preferredCurrency={preferredCurrency}
              projectId={projectId}
              onWorkItemsChange={onWorkItemsChange}
              contributor={contributor}
              setContributor={setContributor}
              unpaidContributions={contributions as RewardableItem[] | null | undefined}
              isCreateProjectRewardLoading={isCreateProjectRewardLoading}
            />
          ) : (
            <Loader />
          )}
        </form>
      </FormProvider>
    </>
  );
};

const mapFormDataToVariables = ({ workItems, amountToWire, currency, contributor }: Inputs) => {
  return {
    amount: amountToWire,
    currency,
    recipientId: contributor.githubUserId,
    items: workItems,
  };
};

export default RewardForm;
