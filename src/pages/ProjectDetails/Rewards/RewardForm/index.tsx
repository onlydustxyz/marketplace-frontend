import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Contributor, Inputs } from "./types";
import { useCallback, useState } from "react";
import { useIntl } from "src/hooks/useIntl";
import View from "./View";
import { useShowToaster } from "src/hooks/useToaster";
import { generatePath, useNavigate, useOutletContext } from "react-router-dom";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import {
  ContributionFragment,
  WorkItemFragment,
  useRequestPaymentMutation,
  useUnrewardedContributionsQuery,
} from "src/__generated/graphql";
import { useCommands } from "src/providers/Commands";
import { ProjectBudgetType } from "src/pages/ProjectDetails/Rewards/RemainingBudget/RemainingBudget";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import Loader from "src/components/Loader";

const RewardForm: React.FC = () => {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const navigate = useNavigate();
  const { projectId, projectKey } = useOutletContext<{
    projectId: string;
    projectKey: string;
  }>();

  const { notify } = useCommands();

  const { data: projectBudget, isLoading: isBudgetLoading } = useRestfulData<ProjectBudgetType>({
    resourcePath: ApiResourcePaths.GET_PROJECT_BUDGETS,
    pathParam: { projectId },
    method: "GET",
  });

  const [requestNewPayment, { loading: requestNewPaymentMutationLoading }] = useRequestPaymentMutation({
    context: { graphqlErrorDisplay: "toaster" },
    onCompleted: () => {
      notify(projectId);
      showToaster(T("reward.form.sent"));
      navigate(generatePath(RoutePaths.ProjectDetails, { projectKey }) + "/" + ProjectRoutePaths.Rewards);
    },
  });

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
      if (contributor)
        requestNewPayment({
          variables: mapFormDataToVariables(projectId, { ...formData, contributor }),
        });
    },
    [contributor, projectId]
  );

  const onWorkEstimationChange = useCallback(
    (amountToPay: number, hoursWorked: number) => {
      formMethods.setValue("amountToWire", amountToPay);
      formMethods.setValue("hoursWorked", hoursWorked);
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
          {!isBudgetLoading ? (
            <View
              budget={{
                remainingAmount: projectBudget?.remainingDollarsEquivalent,
                initialAmount: projectBudget?.initialDollarsEquivalent,
              }}
              projectId={projectId}
              onWorkEstimationChange={onWorkEstimationChange}
              onWorkItemsChange={onWorkItemsChange}
              contributor={contributor}
              setContributor={setContributor}
              unpaidContributions={data?.contributions as ContributionFragment[] | null | undefined}
              requestNewPaymentMutationLoading={requestNewPaymentMutationLoading}
            />
          ) : (
            <Loader />
          )}
        </form>
      </FormProvider>
    </>
  );
};

const mapFormDataToVariables = (projectId: string, { workItems, amountToWire, hoursWorked, contributor }: Inputs) => {
  return {
    projectId,
    contributorId: contributor.githubUserId,
    amount: amountToWire.toFixed(2),
    currency: "USD",
    hoursWorked,
    reason: { workItems },
  };
};

export default RewardForm;
