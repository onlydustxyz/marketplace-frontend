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

const RewardForm: React.FC = () => {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const navigate = useNavigate();
  const { projectId, projectKey, budget } = useOutletContext<{
    projectId: string;
    projectKey: string;
    budget: {
      remainingAmount: number;
      initialAmount: number;
    };
  }>();

  const { notify } = useCommands();

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
      remainingBudget: budget.remainingAmount,
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
        workItems.map(workItem => ({
          id: workItem.id?.toString() || "",
          repoId: workItem.githubIssue?.repoId || workItem.githubPullRequest?.repoId,
          number: workItem.githubIssue?.number || workItem.githubPullRequest?.number,
          type: workItem.type,
        }))
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
          <View
            budget={budget}
            projectId={projectId}
            onWorkEstimationChange={onWorkEstimationChange}
            onWorkItemsChange={onWorkItemsChange}
            contributor={contributor}
            setContributor={setContributor}
            unpaidContributions={data?.contributions as ContributionFragment | null | undefined}
            requestNewPaymentMutationLoading={requestNewPaymentMutationLoading}
          />
        </form>
      </FormProvider>
    </>
  );
};

const mapFormDataToVariables = (projectId: string, { workItems, amountToWire, hoursWorked, contributor }: Inputs) => {
  return {
    projectId,
    contributorId: contributor.githubUserId,
    amount: amountToWire,
    hoursWorked,
    reason: { workItems },
  };
};

export default RewardForm;
