import { PaymentItem, PaymentFixture, Project, User, Uuid, PaymentReceipt, Payment } from "../../types";
import {
  RequestPaymentDocument,
  RequestPaymentMutation,
  RequestPaymentMutationVariables,
} from "../../__generated/graphql";
import { fetchAsAdmin, mutateAsRegisteredUser, waitEvents } from "../common";
import { payments } from "../../fixtures/data/payments";

export const populatePayments = async (users: Record<string, User>, projects: Record<string, Project>) => {
  const populatedPayments = await Promise.all(payments.map(payment => populatePayment(users, projects, payment)));

  const paymentsPerProjectPerRecipient: Record<string, Record<number, Payment[]>> = {};
  populatedPayments.flat().forEach(payment => {
    if (paymentsPerProjectPerRecipient[payment.project] === undefined) {
      paymentsPerProjectPerRecipient[payment.project] = {};
    }
    if (paymentsPerProjectPerRecipient[payment.project][payment.recipientGithubId] === undefined) {
      paymentsPerProjectPerRecipient[payment.project][payment.recipientGithubId] = [];
    }
    paymentsPerProjectPerRecipient[payment.project][payment.recipientGithubId].push(payment);
  });
  return paymentsPerProjectPerRecipient;
};

const populatePayment = async (
  users: Record<string, User>,
  projects: Record<string, Project>,
  payment: PaymentFixture
) => {
  const project = projects[payment.project];
  if (!project) {
    throw new Error(`Project '${payment.project}' does not exist in projects fixture`);
  }

  const requestor = users[payment.requestor];
  if (!requestor) {
    throw new Error(`Requestor '${payment.requestor}' does not exist in users fixture`);
  }

  if (!project.leaders || !project.leaders.includes(payment.requestor)) {
    throw new Error(`Requestor '${payment.requestor}' is not a leader of project '${payment.project}'`);
  }

  return await Promise.all(payment.items.map(item => populatePaymentItem(payment, project, requestor, item)));
};

const populatePaymentItem = async (
  payment: PaymentFixture,
  project: Project,
  requestor: User,
  paymentItem: PaymentItem
): Promise<Payment> => {
  const response = await mutateAsRegisteredUser<RequestPaymentMutation, RequestPaymentMutationVariables>(
    requestor.token,
    {
      mutation: RequestPaymentDocument,
      variables: {
        projectId: project.id,
        contributorId: payment.recipientGithubId,
        amount: paymentItem.amount,
        currency: paymentItem.currency,
        reason: paymentItem.reason,
        hoursWorked: paymentItem.hoursWorked,
      },
    }
  );
  const paymentId: Uuid = response.data?.requestPayment.paymentId;

  await waitEvents();

  if (paymentItem.receipts) {
    await Promise.all(paymentItem.receipts.map(receipt => populateReceipt(paymentId, receipt)));
  }

  return { ...payment, ...paymentItem, id: paymentId };
};

export const populateReceipt = async (paymentId: Uuid, receipt: PaymentReceipt) =>
  fetchAsAdmin(`/payments/${paymentId}/receipts`, "POST", {
    amount: receipt.amount,
    currency: receipt.currencyCode,
    recipientWallet: receipt.recipientWallet,
    recipientIban: receipt.recipientIBAN,
    transactionReference: receipt.transactionReference,
  });
