import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import { Inputs } from "./types";
import { useCallback, useContext, useEffect } from "react";
import { useIntl } from "src/hooks/useIntl";
import View from "./View";
import { useShowToaster } from "src/hooks/useToaster";
import { useLocation } from "react-router-dom";
import { PaymentAction, ProjectDetailsActionType, ProjectDetailsDispatchContext } from "../../ProjectDetailsContext";
import useFindGithubUser from "src/hooks/useIsGithubLoginValid";

export const REGEX_VALID_GITHUB_PULL_REQUEST_URL = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/pull\/\d+$/;

interface PaymentFormProps {
  projectId: string;
  budget: {
    remainingAmount: number;
    initialAmount: number;
  };
}

const PaymentForm: React.FC<PaymentFormProps> = ({ projectId, budget }) => {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const location = useLocation();
  const findUserQuery = useFindGithubUser();

  const defaultContributor = location.state?.recipientGithubLogin;

  const dispatch = useContext(ProjectDetailsDispatchContext);

  useEffect(() => {
    if (defaultContributor) {
      formMethods.setValue("contributorHandle", defaultContributor);
      findUserQuery.trigger(defaultContributor);
    }
  }, [defaultContributor]);
  const formMethods = useForm<Inputs>({
    defaultValues: {
      remainingBudget: budget.remainingAmount,
    },
  });

  const [insertPayment] = useHasuraMutation(REQUEST_PAYMENT_MUTATION, HasuraUserRole.RegisteredUser, {
    variables: { projectId },
    onCompleted: () => {
      showToaster(T("payment.form.sent"));
      formMethods.resetField("linkToIssue");
      formMethods.resetField("contributorHandle");
      formMethods.resetField("contributor");
      dispatch({ type: ProjectDetailsActionType.SelectPaymentAction, selectedPaymentAction: PaymentAction.List });
    },
  });

  const { handleSubmit } = formMethods;

  const onValidSubmit: SubmitHandler<Inputs> = useCallback(async formData => {
    await insertPayment(mapFormDataToSchema(formData));
  }, []);

  const onWorkEstimationChange = useCallback(
    (amount: number) => {
      formMethods.setValue("amountToWire", amount);
    },
    [formMethods]
  );

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onValidSubmit)} className="flex flex-col gap-3 justify-between w-full">
          <View budget={budget} projectId={projectId} onWorkEstimationChange={onWorkEstimationChange} />
        </form>
      </FormProvider>
    </>
  );
};

export const REQUEST_PAYMENT_MUTATION = gql`
  mutation RequestPayment($amount: Int!, $contributorId: Int!, $projectId: Uuid!, $reason: Reason!) {
    requestPayment(amountInUsd: $amount, projectId: $projectId, reason: $reason, recipientId: $contributorId)
  }
`;

const mapFormDataToSchema = ({ linkToIssue, amountToWire, contributor }: Inputs) => {
  return {
    variables: {
      contributorId: contributor.id,
      amount: amountToWire,
      reason: {
        workItems: [linkToIssue],
      },
    },
  };
};

export default PaymentForm;
