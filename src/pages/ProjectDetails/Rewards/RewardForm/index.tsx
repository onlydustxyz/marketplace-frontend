import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Contributor, Inputs } from "./types";
import { useCallback, useState } from "react";
import { useIntl } from "src/hooks/useIntl";
import View from "./View";
import { useShowToaster } from "src/hooks/useToaster";
import { generatePath, useNavigate, useOutletContext } from "react-router-dom";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import { ContributionFragment, WorkItemFragment, useUnrewardedContributionsQuery } from "src/__generated/graphql";
import { ProjectBudgetType } from "src/pages/ProjectDetails/Rewards/RemainingBudget/RemainingBudget";
import { useMutationRestfulData, useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import Loader from "src/components/Loader";
import { useLocalStorage } from "usehooks-ts";
import { reorderBudgets } from "./utils";
import { BudgetCurrencyType } from "src/utils/money";

const RewardForm: React.FC = () => {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const navigate = useNavigate();
  const { projectId, projectKey } = useOutletContext<{
    projectId: string;
    projectKey: string;
  }>();

  const {
    data: projectBudget,
    isLoading: isBudgetLoading,
    refetch,
  } = useRestfulData<ProjectBudgetType>({
    resourcePath: ApiResourcePaths.GET_PROJECT_BUDGETS,
    pathParam: { projectId },
    method: "GET",
  });

  const { mutate: mutateProjectBudget, isPending: mutateProjectBudgetIsPending } = useMutationRestfulData({
    resourcePath: ApiResourcePaths.PROJECT_REWARDS_LIST,
    pathParam: projectId,
    method: "POST",
    onSuccess: async () => {
      await refetch();
      showToaster(T("reward.form.sent"));
      navigate(generatePath(RoutePaths.ProjectDetails, { projectKey }) + "/" + ProjectRoutePaths.Rewards);
    },
  });

  const [preferredCurrency, setPreferredCurrency] = useLocalStorage<BudgetCurrencyType | null>(
    `preferredCurrency-${projectId}`,
    null
  );

  const formMethods = useForm<Inputs>({
    defaultValues: {
      remainingBudget: projectBudget?.remainingDollarsEquivalent,
      contributorHandle: null,
    },
    mode: "all",
  });

  const [contributor, setContributor] = useState<Contributor | null | undefined>(null);

  const { data } = useUnrewardedContributionsQuery({
    variables: {
      projectId,
      githubUserId: contributor?.githubUserId,
    },
    skip: !contributor?.githubUserId,
  });

  const { handleSubmit } = formMethods;

  const onValidSubmit: SubmitHandler<Inputs> = useCallback(
    formData => {
      if (contributor) {
        console.log(mapFormDataToVariables({ ...formData, contributor }));
        mutateProjectBudget(mapFormDataToVariables({ ...formData, contributor }));
      }
    },
    [contributor, projectId]
  );

  const onWorkEstimationChange = useCallback(
    (amountToPay: number, currency: BudgetCurrencyType) => {
      formMethods.setValue("amountToWire", amountToPay);
      formMethods.setValue("currency", currency);
      setPreferredCurrency(currency);
    },
    [formMethods]
  );

  const onWorkItemsChange = useCallback(
    (workItems: WorkItemFragment[]) =>
      formMethods.setValue(
        "workItems",
        workItems.map(workItem => {
          return {
            id: workItem.id?.toString() || "",
            repoId:
              workItem.githubIssue?.repoId ||
              workItem.githubPullRequest?.repoId ||
              workItem.githubCodeReview?.githubPullRequest?.repoId,
            number:
              workItem.githubIssue?.number ||
              workItem.githubPullRequest?.number ||
              workItem.githubCodeReview?.githubPullRequest?.number,

            type: workItem.type,
          };
        })
      ),
    [formMethods]
  );

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
              budget={reorderBudgets(projectBudget)}
              preferredCurrency={preferredCurrency}
              projectId={projectId}
              onWorkEstimationChange={onWorkEstimationChange}
              onWorkItemsChange={onWorkItemsChange}
              contributor={contributor}
              setContributor={setContributor}
              unpaidContributions={data?.contributions as ContributionFragment[] | null | undefined}
              requestNewPaymentMutationLoading={mutateProjectBudgetIsPending}
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
