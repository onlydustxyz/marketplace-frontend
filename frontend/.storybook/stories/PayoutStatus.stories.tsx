import { PaymentStatus } from "src/types";
import PayoutStatus from "src/components/PayoutStatus";

export default {
  title: "PayoutStatus",
  argTypes: {
    status: {
      control: {
        type: "select",
      },
      options: [PaymentStatus.WAITING_PAYMENT, PaymentStatus.ACCEPTED],
    },
    payoutInfoMissing: { control: { type: "boolean" } },
    invoiceNeeded: { control: { type: "boolean" } },
    isProjectLeaderView: { control: { type: "boolean" } },
  },
};

type Props = {
  id: string;
  status: PaymentStatus;
  payoutInfoMissing: boolean;
  invoiceNeeded: boolean;
  isProjectLeaderView: boolean;
};

const props = {
  id: "status-id",
  status: PaymentStatus.WAITING_PAYMENT,
  payoutInfoMissing: false,
  invoiceNeeded: false,
  isProjectLeaderView: false,
};

export const Default = {
  render: (args: Props) => <PayoutStatus {...props} {...args} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};

export const PayoutInfoMissing = {
  render: (args: Props) => <PayoutStatus {...props} {...{ payoutInfoMissing: true }} {...args} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};

export const PendingInvoice = {
  render: (args: Props) => <PayoutStatus {...props} {...{ invoiceNeeded: true }} {...args} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};
