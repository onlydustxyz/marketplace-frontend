import { range } from "lodash";
import { Reward } from "src/components/UserRewardTable/Line";
import { Currency, PaymentStatus } from "src/types";
import { PreferredMethod, UserPayoutInfo, UserPayoutSettingsFragment, WorkItemType } from "src/__generated/graphql";
import InvoiceSubmission from "src/pages/Rewards/InvoiceSubmission/View";
import withToasterProvider from "../decorators/withToasterProvider";

export default {
  title: "InvoiceSubmission",
  component: InvoiceSubmission,
  decorators: [withToasterProvider],
};

const [payment1, payment2, payment3]: Reward[] = range(1, 4).map(id => ({
  id: `payment-${id}`,
  recipientId: 123,
  amount: {
    value: id * 100,
    currency: Currency.USD,
  },
  workItems: [
    {
      paymentId: `payment-${id}`,
      id: id.toString(),
      repoId: 123456,
      number: 123,
      githubIssue: null,
      githubPullRequest: null,
      githubCodeReview: null,
      type: WorkItemType.Issue,
    },
  ],
  requestedAt: new Date(),
  status: PaymentStatus.WAITING_PAYMENT,
  invoiceReceived: id % 2 === 0,
}));

const userInfos: UserPayoutSettingsFragment = {
  userId: "user-1",
  companyName: "My Company",
  companyIdentificationNumber: "1234567890",
  firstname: "James",
  lastname: "Bond",
  address: "007 Big Ben Street",
  postCode: "007GB",
  city: "London",
  country: "GB",
  usdPreferredMethod: PreferredMethod.Crypto,
  ethWallet: "007.eth",
  bic: null,
  iban: null,
  isCompany: true,
  arePayoutSettingsValid: true,
};

export const Default = {
  render: () => (
    <div style={{ width: 320 }}>
      <InvoiceSubmission
        paymentRequests={[payment1, payment2, payment3]}
        githubUserId={123456}
        userInfos={userInfos}
        markInvoiceAsReceived={() => {
          return;
        }}
      />
    </div>
  ),
};
