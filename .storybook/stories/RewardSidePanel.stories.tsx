import { range } from "lodash";
import {
  GithubIssueFragment,
  GithubIssueStatus,
  PaymentRequestDetailsFragment,
  WorkItemType,
} from "src/__generated/graphql";
import SidePanel from "src/components/SidePanel";
import View, { Props } from "src/components/UserRewardTable/RewardSidePanel/View";
import { PaymentStatus } from "src/types";
import { daysFromNow } from "src/utils/date";
import withAuthProvider from "../decorators/withAuthProvider";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import withSidePanelStackProvider from "../decorators/withSidePanelStackProvider";

// TODO this story is obsolete, needs work after multitoken

const statuses = {
  //TODO: uncomment this when API is ready
  //   payoutInfoMissingAsLeader: {
  //     payoutInfoMissing: true,
  //     projectLeaderView: true,
  //     status: PaymentStatus.PAYMENT_INFO_MISSING,
  //   },
  //   payoutInfoMissing: { payoutInfoMissing: true, status: PaymentStatus.PAYMENT_INFO_MISSING },
  pendingInvoice: { payoutInfoMissing: false, invoiceNeeded: true, status: PaymentStatus.PENDING_INVOICE },
  processing: { payoutInfoMissing: false, status: PaymentStatus.PROCESSING },
  complete: { payoutInfoMissing: false, status: PaymentStatus.COMPLETE },
};

export default {
  title: "RewardSidePanel",
  component: View,
  decorators: [withSidePanelStackProvider, withContributorProfilePanelProvider, withAuthProvider],
};

const issues: GithubIssueFragment[] = range(1, 50).map(id => ({
  __typename: "GithubIssues",
  id: id,
  repoId: 123456,
  number: id,
  title: "Update README.md",
  status: GithubIssueStatus.Open,
  htmlUrl: "https://github.com/od-mocks/cool-repo-A/issues/1",
  createdAt: daysFromNow(id),
  closedAt: null,
  mergedAt: null,
  ignoredForProjects: [],
  authorId: 595505,
  assigneeIds: [],
  commentsCount: 0,
}));

const payment: PaymentRequestDetailsFragment = {
  __typename: "PaymentRequests",
  id: "880819f1-2ab9-406d-9bf1-3012b6f565bc",
  amount: 2500,
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
    commentsCount: 0,
    id: githubIssue.id,
    type: WorkItemType.Issue,
    paymentId: "880819f1-2ab9-406d-9bf1-3012b6f565bc",
    repoId: githubIssue.repoId,
    number: githubIssue.number,
    githubIssue,
    githubPullRequest: null,
    githubCodeReview: null,
  })),
};

const args = {
  workItemsCount: 2,
  ...payment,
  //   ...statuses.payoutInfoMissing,
};

type CustomArgs = {
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
      <View {...args} {...props} {...props.payoutStatus} />
    </SidePanel>
  ),
};
