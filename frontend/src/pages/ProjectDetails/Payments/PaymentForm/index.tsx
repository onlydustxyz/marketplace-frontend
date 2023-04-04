import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Inputs } from "./types";
import { useCallback, useState } from "react";
import { useIntl } from "src/hooks/useIntl";
import View from "./View";
import { useShowToaster } from "src/hooks/useToaster";
import { generatePath, useNavigate, useOutletContext } from "react-router-dom";
import usePaymentRequests from "src/hooks/usePaymentRequests";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import { WorkItem } from "src/components/GithubIssue";
import { GithubContributorFragment } from "src/__generated/graphql";

const PaymentForm: React.FC = () => {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const navigate = useNavigate();
  const { projectId, budget } = useOutletContext<{
    projectId: string;
    budget: {
      remainingAmount: number;
      initialAmount: number;
    };
  }>();

  const { requestNewPayment } = usePaymentRequests({
    projectId,
    onNewPaymentRequested: () => {
      showToaster(T("payment.form.sent"));
      navigate(generatePath(RoutePaths.ProjectDetails, { projectId }) + "/" + ProjectRoutePaths.Payments);
    },
  });

  const formMethods = useForm<Inputs>({
    defaultValues: {
      remainingBudget: budget.remainingAmount,
      contributorHandle: null,
    },
    mode: "all",
  });

  const [contributor, setContributor] = useState<GithubContributorFragment | null | undefined>(null);

  const { handleSubmit } = formMethods;

  const onValidSubmit: SubmitHandler<Inputs> = useCallback(
    async formData => {
      if (contributor) await requestNewPayment(mapFormDataToSchema({ ...formData, contributor }));
    },
    [contributor]
  );

  const onWorkEstimationChange = useCallback(
    (amountToPay: number, hoursWorked: number) => {
      formMethods.setValue("amountToWire", amountToPay);
      formMethods.setValue("hoursWorked", hoursWorked);
    },
    [formMethods]
  );

  const onWorkItemsChange = useCallback(
    (workItems: WorkItem[]) =>
      formMethods.setValue(
        "workItems",
        workItems.map(workItem => ({ repoId: workItem.repoId, issueNumber: workItem.number }))
      ),
    [formMethods]
  );

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onValidSubmit)}
          className="flex flex-col gap-6 justify-between w-full"
        >
          <View
            budget={budget}
            projectId={projectId}
            onWorkEstimationChange={onWorkEstimationChange}
            onWorkItemsChange={onWorkItemsChange}
            contributor={contributor}
            setContributor={setContributor}
          />
        </form>
      </FormProvider>
    </>
  );
};

const mapFormDataToSchema = ({ workItems, amountToWire, hoursWorked, contributor }: Inputs) => {
  return {
    variables: {
      contributorId: contributor.id,
      amount: amountToWire,
      hoursWorked,
      reason: { workItems },
    },
  };
};

export default PaymentForm;
