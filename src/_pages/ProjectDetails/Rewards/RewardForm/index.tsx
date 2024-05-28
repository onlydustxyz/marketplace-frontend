"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { Money } from "utils/Money/Money";

import ErrorFallback from "src/ErrorFallback";
import ProjectApi from "src/api/Project";
import { CompletedRewardableItem } from "src/api/Project/queries";
import MeApi from "src/api/me";
import Skeleton from "src/components/Skeleton";
import { usePosthog } from "src/hooks/usePosthog";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useMutationRestfulData, useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { useShowToaster } from "src/hooks/useToaster";
import { ProjectBudgetType } from "src/types";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

import View from "./View";
import { RewardableWorkItem } from "./WorkItemSidePanel/WorkItems/WorkItems";
import { Contributor, Inputs } from "./types";
import { reorderBudgets } from "./utils";

const RewardForm: React.FC = () => {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const router = useRouter();
  const { slug = "" } = useParams<{ slug: string }>();
  const { capture } = usePosthog();

  const queryClient = useQueryClient();

  const { data: project } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const {
    data: projectBudget,
    isLoading: isBudgetLoading,
    isError: isBudgetError,
    refetch,
  } = useRestfulData<ProjectBudgetType>({
    resourcePath: ApiResourcePaths.GET_PROJECT_BUDGETS,
    pathParam: { projectId: project?.id || "" },
    method: "GET",
    enabled: !!project?.id,
    // 5 minutes interval to get the latest dollar rates
    refetchInterval: 300000,
  });

  const { mutate: createProjectReward, isPending: isCreateProjectRewardLoading } = useMutationRestfulData({
    resourcePath: ApiResourcePaths.PROJECT_REWARDS,
    pathParam: project?.id || "",
    method: "POST",
    onSuccess: async () => {
      const formValues = getValues();

      capture("reward_sent", {
        amount: formValues.amountToWire,
        count_contributions: formValues.workItems.length,
        project_id: project?.id,
        recipient_id: contributor?.githubUserId,
        currency: formValues.currency.code,
        amount_in_dollars: formValues.amountInDollars,
      });

      try {
        await refetch();
        showToaster(T("reward.form.sent"));
        queryClient.invalidateQueries({ queryKey: [MeApi.tags.all, ProjectApi.tags.completed_rewardable_items] });
        router.push(NEXT_ROUTER.projects.details.rewards.root(slug));
      } catch (e) {
        console.error(e);
      }
    },
    onError: () => {
      showToaster(T("reward.form.error"), { isError: true });
    },
  });

  const [preferredCurrency, setPreferredCurrency] = useLocalStorage<Money.Currency | undefined>(
    `preferredCurrency-${project?.id}`,
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

  const {
    data: completedContributions,
    isLoading: isCompletedContributionsLoading,
    isError: isCompletedContributionsError,
  } = ProjectApi.queries.useCompletedRewardableItems({
    params: { projectId: project?.id, githubUserId: contributor?.githubUserId.toString() },
    options: { enabled: !!contributor?.githubUserId && !!project?.id },
  });

  if (isCompletedContributionsError) {
    showToaster(T("state.errorFetchingNamedItem", { item: "contributions" }), { isError: true });
  }

  const contributions = completedContributions;

  const { handleSubmit, getValues } = formMethods;

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
              Number(workItem.githubIssue?.repoId) ||
              Number(workItem.githubPullRequest?.repoId) ||
              Number(workItem.githubCodeReview?.repoId) ||
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

  if (isBudgetLoading) {
    return <Skeleton variant="projectRewardForm" />;
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onValidSubmit)}
          className="flex w-full flex-col justify-between gap-6"
        >
          {projectBudget ? (
            <View
              projectBudget={reorderBudgets(projectBudget)}
              preferredCurrency={preferredCurrency}
              projectId={project?.id || ""}
              onWorkItemsChange={onWorkItemsChange}
              contributor={contributor}
              setContributor={setContributor}
              unpaidContributions={contributions as CompletedRewardableItem}
              isCreateProjectRewardLoading={isCreateProjectRewardLoading}
              isCompletedContributionsLoading={isCompletedContributionsLoading}
            />
          ) : null}
        </form>
      </FormProvider>
    </>
  );
};

const mapFormDataToVariables = ({ workItems, amountToWire, currency, contributor }: Inputs) => {
  return {
    amount: amountToWire,
    currencyId: currency.id,
    recipientId: contributor.githubUserId,
    items: workItems,
  };
};

export default RewardForm;
