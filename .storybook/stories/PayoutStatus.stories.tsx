import { PaymentStatus } from "src/types";

import { PayoutStatus } from "components/features/payout-status/payout-status";

export default {
  title: "PayoutStatus",
  argTypes: {
    status: {
      control: {
        type: "select",
      },
      options: [
        PaymentStatus.COMPLETE,
        PaymentStatus.PENDING_SIGNUP,
        PaymentStatus.PROCESSING,
        PaymentStatus.PAYOUT_INFO_MISSING,
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

export const MissingPayoutInfo = {
  render: (args: Props) => <PayoutStatus {...props} {...{ status: PaymentStatus.PAYOUT_INFO_MISSING }} {...args} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};
