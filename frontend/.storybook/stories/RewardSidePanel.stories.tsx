import { range } from "lodash";
import { PaymentStatus } from "src/types";
import { GithubIssueFragment, GithubIssueStatus, PaymentRequestDetailsFragment } from "src/__generated/graphql";
import View, { Props } from "src/components/UserRewardTable/RewardSidePanel/View";
import { daysFromNow } from "src/utils/date";
import withSidePanelStackProvider from "../decorators/withSidePanelStackProvider";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import SidePanel from "src/components/SidePanel";

const statuses = {
  payoutInfoMissingAsLeader: {
    payoutInfoMissing: true,
    projectLeaderView: true,
    status: PaymentStatus.WAITING_PAYMENT,
  },
  payoutInfoMissing: { payoutInfoMissing: true, status: PaymentStatus.WAITING_PAYMENT },
  pendingInvoice: { payoutInfoMissing: false, invoiceNeeded: true, status: PaymentStatus.WAITING_PAYMENT },
  processing: { payoutInfoMissing: false, status: PaymentStatus.WAITING_PAYMENT },
  complete: { payoutInfoMissing: false, status: PaymentStatus.ACCEPTED },
};

export default {
  title: "RewardSidePanel",
  component: View,
  decorators: [withSidePanelStackProvider, withContributorProfilePanelProvider],
  argTypes: {
    payoutStatus: {
      options: Object.keys(statuses),
      mapping: statuses,
      control: {
        type: "select",
        labels: {
          payoutInfoMissingAsLeader: "Payout Info Missing (as project lead)",
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

const issues: GithubIssueFragment[] = range(1, 50).map(id => ({
  __typename: "GithubIssues",
  id: id,
  repoId: 123456,
  number: id,
  title: "Update README.md",
  status: GithubIssueStatus.Open,
  htmlUrl: "https://github.com/od-mocks/cool-repo-A/pull/1",
  createdAt: daysFromNow(id),
  closedAt: null,
  mergedAt: null,
  ignoredForProjects: [],
  authorId: 595505,
  assigneeIds: [],
}));

const payment: PaymentRequestDetailsFragment = {
  __typename: "PaymentRequests",
  id: "880819f1-2ab9-406d-9bf1-3012b6f565bc",
  amountInUsd: 2500,
  githubRecipient: {
    id: 595505,
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    user: null,
    htmlUrl: "",
  },
  invoiceReceivedAt: null,
  requestedAt: new Date("2023-05-17T16:24:00"),
  paymentsAggregate: {
    aggregate: {
      sum: { amount: 0 },
    },
  },
  payments: [
    {
      processedAt: new Date("2023-05-22T16:24:00"),
      receipt: {},
    },
  ],
  requestor: {
    id: "53c45a8e-c762-48b0-a677-6f48ddb8a66b",
    login: "Antho",
    avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
    githubUserId: 43467246,
  },
  workItems: issues.map(githubIssue => ({
    paymentId: "880819f1-2ab9-406d-9bf1-3012b6f565bc",
    repoId: githubIssue.repoId,
    issueNumber: githubIssue.number,
    githubIssue,
    githubPullRequest: null,
    number: 3,
  })),
};

const args = {
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
    <SidePanel
      open={true}
      setOpen={() => {
        return;
      }}
    >
      <View
        {...args}
        {...props}
        {...props.payoutStatus}
        userId={props.requestorIsYou ? payment.requestor?.id : "other"}
        githubUserId={(props.recipientIsYou && payment.githubRecipient?.id) || 0}
        workItems={payment.workItems.slice(0, props.workItemsCount)}
      />
    </SidePanel>
  ),
};
