import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import { Inputs } from "./types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useIntl } from "src/hooks/useIntl";
import View from "./View";
import { FindUserQueryForPaymentFormQuery } from "src/__generated/graphql";
import { debounce } from "lodash";

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
  const formMethods = useForm<Inputs>({
    defaultValues: {
      remainingBudget: budget.remainingAmount,
    },
  });

  const [insertPayment] = useHasuraMutation(REQUEST_PAYMENT_MUTATION, HasuraUserRole.RegisteredUser, {
    variables: { projectId },
  });

  const { handleSubmit, setError, clearErrors } = formMethods;

  const [contributorLogin, setContributorLogin] = useState("");
  const linkToIssue = formMethods.watch("linkToIssue");

  const findUserQuery = useHasuraQuery<FindUserQueryForPaymentFormQuery>(
    FIND_USER_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      skip: !contributorLogin,
      variables: {
        username: contributorLogin,
      },
      context: {
        graphqlErrorDisplay: "none", // tell ApolloWrapper to ignore the errors
      },
    }
  );

  useEffect(() => {
    if (findUserQuery.error) {
      setError("contributor", { message: T("github.invalidLogin") });
    } else {
      clearErrors("contributor");
    }
  }, [findUserQuery.error]);

  const onValidSubmit: SubmitHandler<Inputs> = useCallback(
    async formData => {
      await insertPayment(mapFormDataToSchema(formData, findUserQuery.data?.fetchUserDetails.id));
      window.location.reload();
    },
    [findUserQuery.data?.fetchUserDetails.id]
  );

  const onWorkEstimationChange = useCallback(
    (amount: number) => {
      formMethods.setValue("amountToWire", amount);
    },
    [formMethods]
  );

  const onContributorLoginChange = useCallback(
    debounce(({ target }) => setContributorLogin(target.value), 500),
    [setContributorLogin]
  );

  const validateContributorLogin = useCallback(
    () => !!findUserQuery.data?.fetchUserDetails.id || T("github.invalidLogin"),
    [findUserQuery.data?.fetchUserDetails.id]
  );

  const disableWorkEstimation = useMemo(
    () => !!findUserQuery.error || !findUserQuery.data?.fetchUserDetails?.id || !linkToIssue,
    [findUserQuery.error, findUserQuery.data?.fetchUserDetails?.id, linkToIssue]
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

export const FIND_USER_QUERY = gql`
  query FindUserQueryForPaymentForm($username: String!) {
    fetchUserDetails(username: $username) {
      id
    }
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
