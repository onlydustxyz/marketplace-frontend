import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Currency, Payment, PaymentStatus } from "src/types";

import Payments from ".";

export default {
  title: "Payments",
  component: Payments,
} as ComponentMeta<typeof Payments>;

const mockPayments: Payment[] = [
  {
    amount: { value: 200, currency: Currency.ETH },
    id: "c0cfdf80-bbba-4512-b5ec-066dfa9529b1",
    project: {
      description: "This project is sooooo awesome",
      id: "a4441ead-737a-4feb-8700-60f0721776ff",
      title: "Awesome Project",
    },
    status: PaymentStatus.ACCEPTED,
  },
  {
    amount: { value: 100, currency: Currency.USD },
    id: "6397226d-0461-4451-962c-a61e36fd324b",
    project: {
      description: "This project is kind of good",
      id: "fea3c754-bf35-4f2b-aabc-ff345105322e",
      title: "Good Project",
    },
    status: PaymentStatus.WAITING_PAYMENT,
  },
];

const Template: ComponentStory<typeof Payments> = () => <Payments payments={mockPayments} />;

export const Default = Template.bind({});
