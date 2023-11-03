import { PaymentStatus } from "src/types";
import PayoutStatus from "src/components/PayoutStatus/PayoutStatus";

export default {
  title: "PayoutStatus",
  argTypes: {
    status: {
      control: {
        type: "select",
      },
      options: [
        PaymentStatus.COMPLETE,
        PaymentStatus.PENDING_INVOICE,
        PaymentStatus.PENDING_SIGNUP,
        PaymentStatus.PROCESSING,
        PaymentStatus.MISSING_PAYOUT_INFO,
      ],
    },
  },
};

type Props = {
  status: PaymentStatus;
};

const props = {
  status: PaymentStatus.COMPLETE,
};

export const Default = {
  render: (args: Props) => <PayoutStatus {...props} {...args} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};

export const PendingSignup = {
  render: (args: Props) => <PayoutStatus {...props} {...{ status: PaymentStatus.PENDING_SIGNUP }} {...args} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};

export const Processing = {
  render: (args: Props) => <PayoutStatus {...props} {...{ status: PaymentStatus.PROCESSING }} {...args} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};

export const PendingInvoice = {
  render: (args: Props) => <PayoutStatus {...props} {...{ status: PaymentStatus.PENDING_INVOICE }} {...args} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};

export const MissingPayoutInfo = {
  render: (args: Props) => <PayoutStatus {...props} {...{ status: PaymentStatus.MISSING_PAYOUT_INFO }} {...args} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};