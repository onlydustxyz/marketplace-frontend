import { range } from "lodash";
import { PaymentStatus } from "src/types";
import { IssueDetailsFragment, PaymentRequestDetailsFragment, Status } from "src/__generated/graphql";
import View, { Props } from "./View";

const statuses = {
  payoutInfoMissing: { payoutInfoMissing: true, status: PaymentStatus.WAITING_PAYMENT },
  pendingInvoice: { payoutInfoMissing: false, invoiceNeeded: true, status: PaymentStatus.WAITING_PAYMENT },
  processing: { payoutInfoMissing: false, status: PaymentStatus.WAITING_PAYMENT },
  complete: { payoutInfoMissing: false, status: PaymentStatus.ACCEPTED },
};

export default {
  title: "PaymentRequestSidePanel",
  component: View,
  argTypes: {
    payoutStatus: {
      options: Object.keys(statuses),
      mapping: statuses,
      control: {
        type: "select",
        labels: {
          payoutInfoMissing: "Payout Info Missing",
          pendingInvoice: "Pending Invoice",
          processing: "Processing",
          complete: "Complete",
        },
      },
    },
    requestorIsYou: { type: "boolean" },
    recipientIsYou: { type: "boolean" },
    workItemsCount: {
      control: { type: "range", min: 1, max: 50 },
    },
  },
};

const daysFromNow = (days: number) => new Date(Date.now() - days * 24 * 3600 * 1000);

const issues: IssueDetailsFragment[] = range(1, 50).map(id => ({
  __typename: "Issue",
  id: id,
  number: id,
  title: "Update README.md",
  status: Status.Open,
  htmlUrl: "https://github.com/od-mocks/cool-repo-A/pull/1",
  createdAt: daysFromNow(id),
  closedAt: null,
  mergedAt: null,
}));

const payment: PaymentRequestDetailsFragment = {
  __typename: "PaymentRequests",
  id: "880819f1-2ab9-406d-9bf1-3012b6f565bc",
  amountInUsd: 2500,
  githubRecipient: {
    id: 595505,
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  },
  invoiceReceivedAt: null,
  requestedAt: daysFromNow(7),
  requestor: {
    id: "53c45a8e-c762-48b0-a677-6f48ddb8a66b",
    displayName: "Antho",
    avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
  },
  workItems: issues.map(githubIssue => ({ githubIssue })),
};

const args = {
  open: true,
  setOpen: () => {
    return;
  },
  workItemsCount: 2,
  ...payment,
  ...statuses.payoutInfoMissing,
};

type CustomArgs = {
  requestorIsYou: boolean;
  recipientIsYou: boolean;
  workItemsCount: number;
  payoutStatus: {
    payoutInfoMissing?: boolean;
    invoiceNeeded?: boolean;
    status: PaymentStatus;
  };
};

export const Default = {
  render: (props: Props & CustomArgs) => (
    <View
      {...args}
      {...props}
      {...props.payoutStatus}
      userId={props.requestorIsYou ? payment.requestor?.id : "other"}
      githubUserId={(props.recipientIsYou && payment.githubRecipient?.id) || 0}
      workItems={payment.workItems.slice(0, props.workItemsCount)}
    />
  ),
};
