import { gql } from "@apollo/client";
import { useState } from "react";
import { useHasuraLazyQuery, useHasuraQuery } from "src/hooks/useHasuraQuery";
import { Currency, HasuraUserRole, PaymentStatus } from "src/types";
import {
  GetGithubUserQuery,
  GetPaymentRequestsForProjectQuery,
  GithubUserFragment,
  PaymentRequestFragment,
} from "src/__generated/graphql";

export default function useGetPaymentRequests(projectId: string) {
  const fetchAllGithubRecipients = (query: GetPaymentRequestsForProjectQuery) => {
    const allRecipientIds = new Set(
      query.projectsByPk?.budgets.map(b => b.paymentRequests.map(r => r.recipientId)).flat() || []
    );
    allRecipientIds.forEach(id => getGithubUser({ variables: { githubUserId: id } }));
  };

  const getPaymentRequestsQuery = useHasuraQuery<GetPaymentRequestsForProjectQuery>(
    GET_PAYMENT_REQUESTS_FOR_PROJECT,
    HasuraUserRole.RegisteredUser,
    {
      variables: { projectId },
      onCompleted: fetchAllGithubRecipients,
    }
  );

  const [githubRecipients, setGithubRecipients] = useState<Record<number, GithubUserFragment>>({});

  const addGithubRecipient = (query: GetGithubUserQuery) =>
    setGithubRecipients(recipients => ({
      ...recipients,
      [query.fetchUserDetailsById.id]: query.fetchUserDetailsById,
    }));

  const [getGithubUser] = useHasuraLazyQuery<GetGithubUserQuery>(GET_GITHUB_USER_QUERY, HasuraUserRole.RegisteredUser, {
    onCompleted: addGithubRecipient,
  });

  const toPaymentRequest = (paymentRequest: PaymentRequestFragment) => {
    const paidAmount = paymentRequest.payments.reduce((total, payment) => total + payment.amount, 0);
    const recipient = githubRecipients[paymentRequest.recipientId];

    return {
      id: paymentRequest.id,
      amount: { value: paymentRequest.amountInUsd, currency: Currency.USD },
      recipient: recipient && {
        id: recipient.id,
        login: recipient.login,
        avatarUrl: recipient.avatarUrl,
      },
      reason: paymentRequest.reason?.work_items?.at(0),
      status: paidAmount === paymentRequest.amountInUsd ? PaymentStatus.ACCEPTED : PaymentStatus.WAITING_PAYMENT,
    };
  };

  return {
    ...getPaymentRequestsQuery,
    data: getPaymentRequestsQuery.data && {
      budget: getPaymentRequestsQuery.data.projectsByPk?.budgets.reduce(
        (acc, b) => ({
          remainingAmount: acc.remainingAmount + b.remainingAmount,
          initialAmount: acc.initialAmount + b.initialAmount,
        }),
        { initialAmount: 0, remainingAmount: 0 }
      ),
      paymentRequests: getPaymentRequestsQuery.data.projectsByPk?.budgets
        .map(b => b.paymentRequests)
        .flat()
        .map(toPaymentRequest),
    },
  };
}

const PAYMENT_REQUEST_FRAGMENT = gql`
  fragment PaymentRequest on PaymentRequests {
    id
    recipientId
    amountInUsd
    reason
    payments {
      amount
      currencyCode
    }
  }
`;

export const GET_PAYMENT_REQUESTS_FOR_PROJECT = gql`
  ${PAYMENT_REQUEST_FRAGMENT}
  query GetPaymentRequestsForProject($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      id
      budgets {
        id
        initialAmount
        remainingAmount
        paymentRequests {
          ...PaymentRequest
        }
      }
    }
  }
`;

const GITHUB_USER_FRAGMENT = gql`
  fragment GithubUser on User {
    id
    login
    avatarUrl
  }
`;

export const GET_GITHUB_USER_QUERY = gql`
  ${GITHUB_USER_FRAGMENT}
  query GetGithubUser($githubUserId: Int!) {
    fetchUserDetailsById(userId: $githubUserId) {
      ...GithubUser
    }
  }
`;
