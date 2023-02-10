import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Inputs } from "./types";
import { useCallback, useContext, useEffect } from "react";
import { useIntl } from "src/hooks/useIntl";
import View from "./View";
import { useShowToaster } from "src/hooks/useToaster";
import { useLocation } from "react-router-dom";
import { PaymentAction, ProjectDetailsActionType, ProjectDetailsDispatchContext } from "../../ProjectDetailsContext";
import useFindGithubUser from "src/hooks/useIsGithubLoginValid";
import usePaymentRequests from "src/hooks/usePaymentRequests";

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
  const { requestNewPayment } = usePaymentRequests({
    projectId,
    onNewPaymentRequested: () => {
      showToaster(T("payment.form.sent"));
      formMethods.resetField("linkToIssue");
      formMethods.resetField("contributorHandle");
      formMethods.resetField("contributor");
      dispatch({ type: ProjectDetailsActionType.SelectPaymentAction, selectedPaymentAction: PaymentAction.List });
    },
  });

  useEffect(() => {
    if (defaultContributor) {
      formMethods.setValue("contributorHandle", defaultContributor);
      findUserQuery.trigger(defaultContributor);
    }
  }, [defaultContributor]);

  const formMethods = useForm<Inputs>({
    defaultValues: {
      remainingBudget: budget.remainingAmount,
      contributorHandle: null,
    },
    mode: "all",
  });

  const { handleSubmit } = formMethods;

  const onValidSubmit: SubmitHandler<Inputs> = useCallback(async formData => {
    await requestNewPayment(mapFormDataToSchema(formData));
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
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onValidSubmit)}
          className="flex flex-col gap-3 justify-between w-full"
        >
          <View budget={budget} projectId={projectId} onWorkEstimationChange={onWorkEstimationChange} />
        </form>
      </FormProvider>
    </>
  );
};

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
