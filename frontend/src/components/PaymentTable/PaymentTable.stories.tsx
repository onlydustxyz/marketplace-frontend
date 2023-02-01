import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Currency, PaymentStatus } from "src/types";

import PaymentTable, { PaymentRequest } from ".";

export default {
  title: "PaymentTable",
  component: PaymentTable,
} as ComponentMeta<typeof PaymentTable>;

const mockPayments: PaymentRequest[] = [
  {
    amount: { value: 200, currency: Currency.ETH },
    id: "c0cfdf80-bbba-4512-b5ec-066dfa9529b1",
    recipient: {
      login: "ofux",
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    },
    status: PaymentStatus.ACCEPTED,
    reason: "PR#1",
    requestedAt: new Date(),
  },
  {
    amount: { value: 100, currency: Currency.USD },
    id: "6397226d-0461-4451-962c-a61e36fd324b",
    recipient: {
      login: "ofux",
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    },
    reason: "Link to my perfect PR",
    status: PaymentStatus.WAITING_PAYMENT,
    requestedAt: new Date("2023-01-01"),
  },
];

const Template: ComponentStory<typeof PaymentTable> = () => <PaymentTable payments={mockPayments} />;

export const Default = Template.bind({});
