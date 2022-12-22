import { gql } from "@apollo/client";
import Card from "src/components/Card";
import PaymentTable, { mapApiPaymentsToProps } from "src/components/PaymentTable";
import PaymentTableFallback from "src/components/PaymentTableFallback";
import QueryWrapper from "src/components/QueryWrapper";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { GetPaymentRequestsForBudgetIdQuery } from "src/__generated/graphql";

interface PaymentTableQueryContainerProps {
  budgetId: string;
}

export default function PaymentTableContainer({ budgetId }: PaymentTableQueryContainerProps) {
  const query = useHasuraQuery<GetPaymentRequestsForBudgetIdQuery>(
    GET_BUDGET_PAYMENTS_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { budgetId },
    }
  );
  const { data } = query;
  const payments = data?.paymentRequests?.map(mapApiPaymentsToProps) ?? null;
  const hasPayments = payments && payments.length > 0;

  return (
    <QueryWrapper query={query}>
      <Card>{hasPayments ? <PaymentTable payments={payments} /> : <PaymentTableFallback />}</Card>
    </QueryWrapper>
  );
}

export const GET_BUDGET_PAYMENTS_QUERY = gql`
  query GetPaymentRequestsForBudgetId($budgetId: uuid!) {
    paymentRequests(where: { budgetId: { _eq: $budgetId } }) {
      id
      payments {
        amount
        currencyCode
      }
      amountInUsd
      budget {
        project {
          id
          name
          projectDetails {
            description
          }
        }
      }
    }
  }
`;
