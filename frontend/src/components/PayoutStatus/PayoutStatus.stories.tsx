import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import { PaymentStatus } from "src/types";
import PayoutStatus from ".";

export default {
  title: "PayoutStatus",
  argTypes: {
    status: {
      control: {
        type: "select",
        options: [PaymentStatus.WAITING_PAYMENT, PaymentStatus.ACCEPTED],
      },
    },
  },
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => <PayoutStatus {...args} />;

const args = {
  id: "status-id",
  status: PaymentStatus.WAITING_PAYMENT,
  payoutInfoMissing: false,
};

export const Default = Template.bind({});
Default.args = args;
Default.parameters = {
  backgrounds: {
    default: "space",
  },
};

export const PayoutInfoMissing = Template.bind({});
PayoutInfoMissing.args = { ...args, payoutInfoMissing: true };
PayoutInfoMissing.parameters = {
  backgrounds: {
    default: "space",
  },
};
