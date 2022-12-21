import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import Slider from "./Slider";
import Select from "./Select";
import { Inputs } from "./types";
import Input from "src/components/FormInput";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "src/hooks/useIntl";
import { GetUsersForPaymentFormQuery } from "src/__generated/graphql";
import Card from "src/components/Card";

const BASE_DAILY_RATE_DOLLARS = 200;

function computePaymentBounds(days: number, seniority: number, satisfaction: number) {
  const base = days * (1 + seniority * 0.2) * (1 + satisfaction * 0.1) * BASE_DAILY_RATE_DOLLARS;
  return { lowerPaymentBound: Math.floor(base * 0.9), upperPaymentBound: Math.floor(base * 1.1) };
}

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
  const { handleSubmit, control, watch } = formMethods;
  const formValues = watch(["workingDays", "seniority", "satisfaction"]);

  const { lowerPaymentBound, upperPaymentBound } = useMemo(
    () => computePaymentBounds(...formValues),
    [JSON.stringify(formValues)]
  );

  const [amountToWire, setAmountToWire] = useState(Math.floor((upperPaymentBound + lowerPaymentBound) / 2));

  useEffect(() => {
    setAmountToWire(Math.floor((upperPaymentBound + lowerPaymentBound) / 2));
  }, [lowerPaymentBound, upperPaymentBound]);

  const [insertPayment, requestPaymentMutation] = useHasuraMutation(
    REQUEST_PAYMENT_MUTATION,
    HasuraUserRole.RegisteredUser,
    {
      variables: { budgetId: budget.id, amountToWire },
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

  const SENIORITY = [
    T("seniority.levels.junior"),
    T("seniority.levels.advanced"),
    T("seniority.levels.senior"),
    T("seniority.levels.expert"),
  ];
  const SATISFACTION = [
    T("payment.form.statisfaction.levels.fair"),
    T("payment.form.statisfaction.levels.good"),
    T("payment.form.statisfaction.levels.excellent"),
  ];

  const handleSuggestedAmountChange = (e: any) => {
    setAmountToWire(e.target.value);
  };

  return (
    <>
      {getUserGithubIdsQuery.data && (
        <div className="flex flex-col gap-10">
          <div>
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 justify-between">
                <div className="flex flex-col justify-between gap-10">
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
                            .map((user: any) => (
                              <option key={user.githubUser.githubUserId} value={user.githubUser.githubUserId}>
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
                  {
                    <Card>
                      <div className="flex flex-col gap-8">
                        <div className="text-2xl text-bold">Amount estimation</div>
                        <div className="flex flex-row gap-10">
                          <div className="flex flex-col gap-3 w-1/2">
                            <div>
                              {T("seniority.title")}
                              <Slider
                                control={control}
                                name="seniority"
                                minValue={0}
                                maxValue={SENIORITY.length - 1}
                                defaultValue={1}
                                displayValue={(value: number) => SENIORITY[value]}
                              />
                            </div>
                            <div>
                              {T("payment.form.workingDays")}
                              <Slider
                                control={control}
                                name="workingDays"
                                minValue={1}
                                maxValue={20}
                                defaultValue={10}
                                displayValue={(value: number) => `${value} days`}
                              />
                            </div>
                            <div>
                              {T("payment.form.statisfaction.title")}
                              <Slider
                                control={control}
                                name="satisfaction"
                                minValue={0}
                                maxValue={2}
                                defaultValue={1}
                                displayValue={(value: number) => SATISFACTION[value]}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col border-solid border-2 rounded-md border-white p-5 gap-5">
                            <div className="flex">
                              {T("payment.form.recommendation", { lowerPaymentBound, upperPaymentBound })}
                            </div>
                            <div className="flex">
                              <Input
                                name="amountToWire"
                                label={T("payment.form.amountToWire")}
                                type="number"
                                value={amountToWire}
                                onChange={handleSuggestedAmountChange}
                                options={{
                                  valueAsNumber: true,
                                  validate: value => value > 0,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  }
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
