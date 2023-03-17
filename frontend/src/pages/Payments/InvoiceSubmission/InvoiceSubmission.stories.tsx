import { range } from "lodash";
import { Payment } from "src/components/PayoutTable/Line";
import { Currency, PaymentStatus } from "src/types";
import { UserInfo } from "src/__generated/graphql";
import InvoiceSubmission from ".";

export default {
  title: "InvoiceSubmission",
  component: InvoiceSubmission,
};

const [payment1, payment2, payment3]: Payment[] = range(1, 4).map(id => ({
  id: `payment-${id}`,
  amount: {
    value: id * 100,
    currency: Currency.USD,
  },
  reason: "",
  requestedAt: new Date(),
  status: PaymentStatus.WAITING_PAYMENT,
  invoiceReceived: id % 2 === 0,
}));

const userInfos: UserInfo = {
  userId: "user-1",
  identity: {
    Company: {
      name: "My Company",
      identificationNumber: "1234567890",
      owner: { firstname: "James", lastname: "Bond" },
    },
  },
  contactInformation: {},
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
      <InvoiceSubmission paymentRequests={[payment1, payment2, payment3]} githubUserId={123456} userInfos={userInfos} />
    </div>
  ),
};
