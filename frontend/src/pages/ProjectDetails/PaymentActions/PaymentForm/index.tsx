import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import { Inputs } from "./types";
import { useCallback, useEffect, useMemo } from "react";
import { useIntl } from "src/hooks/useIntl";
import View from "./View";
import { debounce } from "lodash";
import useFindGithubUser from "src/hooks/useIsGithubLoginValid";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  const defaultContributor = location.state?.recipientGithubLogin;

  useEffect(() => {
    if (defaultContributor) {
      findUserQuery.trigger(defaultContributor);
    }
  }, [defaultContributor]);

  const formMethods = useForm<Inputs>({
    defaultValues: {
      contributor: defaultContributor,
      remainingBudget: budget.remainingAmount,
    },
  });

  const [insertPayment] = useHasuraMutation(REQUEST_PAYMENT_MUTATION, HasuraUserRole.RegisteredUser, {
    variables: { projectId },
  });

  const { handleSubmit, setError, clearErrors } = formMethods;

  const linkToIssue = formMethods.watch("linkToIssue");
  const findUserQuery = useFindGithubUser();

  useEffect(() => {
    if (findUserQuery.error) {
      setError("contributor", { message: T("github.invalidLogin") });
    } else {
      clearErrors("contributor");
    }
  }, [findUserQuery.error]);

  const onValidSubmit: SubmitHandler<Inputs> = useCallback(
    async formData => {
      await insertPayment(mapFormDataToSchema(formData, findUserQuery.userId));
      window.location.reload();
    },
    [findUserQuery.userId]
  );

  const onWorkEstimationChange = useCallback(
    (amount: number) => {
      formMethods.setValue("amountToWire", amount);
    },
    [formMethods]
  );

  const onContributorLoginChange = debounce(({ target }) => findUserQuery.trigger(target.value), 500);

  const validateContributorLogin = useCallback(
    () => !!findUserQuery.userId || T("github.invalidLogin"),
    [findUserQuery.userId]
  );

  const disableWorkEstimation = useMemo(
    () => !!findUserQuery.error || !findUserQuery.userId || !linkToIssue,
    [findUserQuery.error, findUserQuery.userId, linkToIssue]
  );

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onValidSubmit)} className="flex flex-col gap-3 justify-between w-full">
          <View
            budget={budget}
            loading={findUserQuery.loading}
            disableWorkEstimation={disableWorkEstimation}
            onContributorLoginChange={onContributorLoginChange}
            onWorkEstimationChange={onWorkEstimationChange}
            validateContributorLogin={validateContributorLogin}
          />
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

const mapFormDataToSchema = ({ linkToIssue, amountToWire }: Inputs, contributorId?: number) => {
  return {
    variables: {
      contributorId,
      amount: amountToWire,
      reason: {
        workItems: [linkToIssue],
      },
    },
  };
};

export default PaymentForm;
