import { chain } from "lodash";
import {
  PaymentItem,
  PaymentFixture,
  Project,
  ProjectFixture,
  User,
  UserFixture,
  Uuid,
  PaymentReceipt,
  Payment,
} from "../../types";
import {
  AddEthPaymentReceiptDocument,
  AddEthPaymentReceiptMutation,
  AddEthPaymentReceiptMutationVariables,
  AddFiatPaymentReceiptDocument,
  AddFiatPaymentReceiptMutation,
  AddFiatPaymentReceiptMutationVariables,
  RequestPaymentDocument,
  RequestPaymentMutation,
  RequestPaymentMutationVariables,
} from "../../__generated/graphql";
import { mutateAsAdmin, mutateAsRegisteredUser } from "../common";
import { payments } from "../../fixtures/payments";

export const populatePayments = async (users: Record<string, User>, projects: Record<string, Project>) => {
  const paymentValues = chain(Object.values(payments)).value();

  const populatedPayments = await Promise.all(paymentValues.map(payment => populatePayment(users, projects, payment)));

  //TODO arrange populatedPayments in a Record<projectKey, Record<recipientGithubId, Payment[]>>
};

const populatePayment = async (
  users: Record<string, User>,
  projects: Record<string, Project>,
  payment: PaymentFixture
) => {
  const project = projects[payment.project];
  if (!project) {
    throw new Error(`Project ${payment.project} does not exist in projects fixture`);
  }

  const requestor = users[payment.requestor];
  if (!requestor) {
    throw new Error(`Requestor ${payment.requestor} does not exist in users fixture`);
  }

  if (!project.leaders || !project.leaders.includes(payment.requestor)) {
    throw new Error(`Requestor ${payment.requestor} is not a leader of project ${payment.project}`);
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
        reason: paymentItem.reason,
      },
    }
  );
  const paymentId: Uuid = response.data?.requestPayment;

  if (paymentItem.receipts) {
    await Promise.all(paymentItem.receipts.map(receipt => populateReceipt(paymentId, project, receipt)));
  }

  return { ...payment, ...paymentItem, id: paymentId };
};

const populateReceipt = async (paymentId: Uuid, project: Project, receipt: PaymentReceipt) => {
  if (receipt.recipientETHIdentity) {
    await mutateAsAdmin<AddEthPaymentReceiptMutation, AddEthPaymentReceiptMutationVariables>({
      mutation: AddEthPaymentReceiptDocument,
      variables: {
        projectId: project.id,
        paymentId,
        amount: `${receipt.amount}`,
        currencyCode: receipt.currencyCode,
        recipientIdentity: receipt.recipientETHIdentity,
        transactionHash: receipt.transactionHashOrReference,
      },
    });
  } else if (receipt.recipientIBAN) {
    await mutateAsAdmin<AddFiatPaymentReceiptMutation, AddFiatPaymentReceiptMutationVariables>({
      mutation: AddFiatPaymentReceiptDocument,
      variables: {
        projectId: project.id,
        paymentId,
        amount: `${receipt.amount}`,
        currencyCode: receipt.currencyCode,
        recipientIban: receipt.recipientIBAN,
        transactionReference: receipt.transactionHashOrReference,
      },
    });
  } else {
    throw new Error("Receipt must either has a recipientETHIdentity or a recipientIBAN");
  }
  return true;
};
