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
    requestedAt: "2023-01-18 16:34:45.283595",
    project: {
      description: "This project is sooooo awesome",
      id: "a4441ead-737a-4feb-8700-60f0721776ff",
      title: "Awesome Project",
      logoUrl: "https://avatars.githubusercontent.com/u/25772758?v=4",
    },
    status: PaymentStatus.ACCEPTED,
    reason: "https://github.com/open-dust/cairo-foundry/pull/110",
  },
  {
    amount: { value: 100, currency: Currency.USD },
    id: "6397226d-0461-4451-962c-a61e36fd324b",
    requestedAt: "2023-01-17 16:34:45.283595",
    project: {
      description: "This project is kind of good",
      id: "fea3c754-bf35-4f2b-aabc-ff345105322e",
      title: "Good Project",
    },
    reason: "https://github.com/open-dust/cairo-foundry/pull/110",
    status: PaymentStatus.WAITING_PAYMENT,
  },
];

const Template: ComponentStory<typeof Payments> = () => <Payments payments={mockPayments} />;

export const Default = Template.bind({});
