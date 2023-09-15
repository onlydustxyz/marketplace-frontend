import { range } from "lodash";
import { Reward } from "src/components/UserRewardTable/Line";
import { Currency, PaymentStatus } from "src/types";
import { UserPayoutInfo } from "src/__generated/graphql";
import InvoiceSubmission from "src/pages/Rewards/InvoiceSubmission/View";
import withToasterProvider from "../decorators/withToasterProvider";

export default {
  title: "InvoiceSubmission",
  component: InvoiceSubmission,
  decorators: [withToasterProvider],
};

const [payment1, payment2, payment3]: Reward[] = range(1, 4).map(id => ({
  id: `payment-${id}`,
  amount: {
    value: id * 100,
    currency: Currency.USD,
  },
  workItems: [
    {
      paymentId: `payment-${id}`,
      repoId: 123456,
      number: 123,
    },
  ],
  requestedAt: new Date(),
  status: PaymentStatus.WAITING_PAYMENT,
  invoiceReceived: id % 2 === 0,
}));

const userInfos: UserPayoutInfo = {
  userId: "user-1",
  identity: {
    Company: {
      name: "My Company",
      identificationNumber: "1234567890",
      owner: { firstname: "James", lastname: "Bond" },
    },
  },
  location: {
    address: "007 Big Ben Street",
    post_code: "007GB",
    city: "London",
    country: "GB",
  },
  payoutSettings: {
    EthTransfer: { Name: "007.eth" },
  },
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
