import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import Select from "./Select";
import { Inputs } from "./types";
import Input from "src/components/FormInput";
import { useState } from "react";
import { useIntl } from "src/hooks/useIntl";
import { GetUsersForPaymentFormQuery } from "src/__generated/graphql";
import Card from "src/components/Card";
import EstimationComponent, { BASE_RATE_USD } from "./EstimationComponent";

const DEFAULT_NUMBER_OF_DAYS = 2;

interface PaymentFormProps {
  budget: {
    remainingAmount: number;
    initialAmount: number;
    id: string;
  };
}

const PaymentForm: React.FC<PaymentFormProps> = ({ budget }) => {
  const { T } = useIntl();
  const formMethods = useForm<Inputs>({
    defaultValues: {
      linkToIssue: "",
      contributor: "",
      remainingBudget: budget?.remainingAmount,
    },
  });

  const [numberOfDays, setNumberOfDays] = useState(DEFAULT_NUMBER_OF_DAYS);

  const [insertPayment] = useHasuraMutation(REQUEST_PAYMENT_MUTATION, HasuraUserRole.RegisteredUser, {
    variables: { budgetId: budget.id, amount: numberOfDays * BASE_RATE_USD },
  });

  const getUserGithubIdsQuery = useHasuraQuery<GetUsersForPaymentFormQuery>(
    GET_USERS_QUERY,
    HasuraUserRole.RegisteredUser
  );
  const { handleSubmit, control } = formMethods;

  const onSubmit: SubmitHandler<Inputs> = async formData => {
    await insertPayment(mapFormDataToSchema(formData));
    window.location.reload();
  };

  return (
    <>
      {getUserGithubIdsQuery.data && (
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 justify-between w-full">
            <div className="flex flex-col gap-3">
              <Card>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col">
                    <Select
                      label={T("payment.form.contributor")}
                      name="contributor"
                      options={{ required: T("form.required") }}
                      control={control}
                    >
                      {getUserGithubIdsQuery.data.users
                        .filter(user => user.githubUser)
                        .map(user => (
                          <option key={user.githubUser?.githubUserId} value={user.githubUser?.githubUserId}>
                            {user.displayName}
                          </option>
                        ))}
                    </Select>
                    <Input
                      label={T("payment.form.linkToIssue")}
                      name="linkToIssue"
                      placeholder=""
                      options={{ required: T("form.required") }}
                    />
                  </div>
                </div>
              </Card>
              <EstimationComponent
                numberOfDays={numberOfDays}
                decreaseNumberOfDays={() => {
                  if (numberOfDays > 1) setNumberOfDays(numberOfDays - 1);
                }}
                increaseNumberOfDays={() => {
                  if (numberOfDays < 20 && budget.remainingAmount - (numberOfDays + 1) * BASE_RATE_USD > 0) {
                    setNumberOfDays(numberOfDays + 1);
                  }
                }}
                budget={{ ...budget }}
              />
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
};

export const GET_USERS_QUERY = gql`
  query GetUsersForPaymentForm {
    users {
      displayName
      githubUser {
        githubUserId
      }
    }
  }
`;

export const REQUEST_PAYMENT_MUTATION = gql`
  mutation RequestPayment($amount: Int!, $contributorId: Int!, $budgetId: Uuid!) {
    requestPayment(amountInUsd: $amount, budgetId: $budgetId, reason: "{}", recipientId: $contributorId)
  }
`;

const mapFormDataToSchema = ({ contributor }: Inputs) => {
  return {
    variables: {
      contributorId: parseInt(contributor),
    },
  };
};

export default PaymentForm;
