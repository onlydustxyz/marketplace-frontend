import { PaymentStatus } from "src/types";
import PayoutStatus from "src/components/PayoutStatus";

export default {
  title: "PayoutStatus",
  argTypes: {
    status: {
      control: {
        type: "select",
      },
      options: [
        PaymentStatus.Complete,
        PaymentStatus.PendingInvoice,
        PaymentStatus.PendingSignup,
        PaymentStatus.Processing,
      ],
    },
  },
};

type Props = {
  status: PaymentStatus;
};

const props = {
  status: PaymentStatus.Complete,
};

export const Default = {
  render: (args: Props) => <PayoutStatus {...props} {...args} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};

export const PendingSignup = {
  render: (args: Props) => <PayoutStatus {...props} {...{ status: PaymentStatus.PendingSignup }} {...args} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};

export const Processing = {
  render: (args: Props) => <PayoutStatus {...props} {...{ status: PaymentStatus.Processing }} {...args} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};

export const PendingInvoice = {
  render: (args: Props) => <PayoutStatus {...props} {...{ status: PaymentStatus.PendingInvoice }} {...args} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};
