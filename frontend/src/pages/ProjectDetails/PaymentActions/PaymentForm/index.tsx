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
import headerElementBackground from "src/assets/img/header-element-background.png";
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
  const formMethods = useForm<Inputs>({
    defaultValues: {
      linkToIssue: "",
      contributor: "",
      remainingBudget: budget?.remainingAmount,
      seniority: 1,
      workingDays: 10,
      satisfaction: 1,
    },
  });
  const { handleSubmit, control } = formMethods;
  const [numberOfDays, setNumberOfDays] = useState(DEFAULT_NUMBER_OF_DAYS);

  const [insertPayment, requestPaymentMutation] = useHasuraMutation(
    REQUEST_PAYMENT_MUTATION,
    HasuraUserRole.RegisteredUser,
    {
      variables: { budgetId: budget.id, amount: numberOfDays * BASE_RATE_USD },
    }
  );
  const success = !!requestPaymentMutation.data;
  const getUserGithubIdsQuery = useHasuraQuery<GetUsersForPaymentFormQuery>(
    GET_USERS_QUERY,
    HasuraUserRole.RegisteredUser
  );

  const onSubmit: SubmitHandler<Inputs> = async formData => {
    await insertPayment(mapFormDataToSchema(formData));
  };

  const { T } = useIntl();

  return (
    <>
      {getUserGithubIdsQuery.data && (
        <div className="flex flex-col gap-10">
          <div>
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 justify-between">
                <div className="flex flex-row justify-between gap-10">
                  <Card>
                    <div className="flex flex-col gap-8">
                      <div className="text-2xl text-bold">Issue information</div>
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
                      if (numberOfDays < 9 && budget.remainingAmount - (numberOfDays + 1) * BASE_RATE_USD > 0) {
                        setNumberOfDays(numberOfDays + 1);
                      }
                    }}
                    budget={{ ...budget }}
                  />
                </div>
                <div className="flex flex-row gap-5">
                  <button type="submit" className="self-start border-white border-2 px-3 py-2 rounded-md">
                    {requestPaymentMutation.loading ? T("state.loading") : T("profile.form.send")}
                  </button>
                  {success && <p>{T("payment.form.sent")}</p>}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
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

const mapFormDataToSchema = ({ amountToWire, contributor }: Inputs) => {
  return {
    variables: {
      amount: amountToWire,
      contributorId: parseInt(contributor),
    },
  };
};

export default PaymentForm;
