import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import { Inputs } from "./types";
import Input from "src/components/FormInput";
import { useState } from "react";
import { useIntl } from "src/hooks/useIntl";
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

  const { handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<Inputs> = async formData => {
    await insertPayment(mapFormDataToSchema(formData));
    window.location.reload();
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 justify-between w-full">
          <div className="flex flex-col gap-3">
            <Card>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                  <Input
                    label={T("payment.form.contributor")}
                    name="contributor"
                    placeholder="Github login"
                    options={{ required: T("form.required") }}
                  />
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
                if (numberOfDays < 20 && budget.remainingAmount - (numberOfDays + 1) * BASE_RATE_USD >= 0) {
                  setNumberOfDays(numberOfDays + 1);
                }
              }}
              budget={{ ...budget }}
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export const REQUEST_PAYMENT_MUTATION = gql`
  mutation RequestPayment($amount: Int!, $contributorId: Int!, $budgetId: Uuid!, $reason: Reason!) {
    requestPayment(amountInUsd: $amount, budgetId: $budgetId, reason: $reason, recipientId: $contributorId)
  }
`;

const mapFormDataToSchema = ({ contributor, linkToIssue }: Inputs) => {
  return {
    variables: {
      contributorId: parseInt(contributor),
      reason: {
        workItems: [linkToIssue],
      },
    },
  };
};

export default PaymentForm;
