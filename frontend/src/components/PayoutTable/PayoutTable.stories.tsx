import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Currency, Payment, PaymentStatus } from "src/types";

import PayoutTable from ".";

export default {
  title: "PayoutTable",
  component: PayoutTable,
} as ComponentMeta<typeof PayoutTable>;

const daysFromNow = (days: number) => new Date(Date.now() - days * 24 * 3600 * 1000);

const mockPayments: Payment[] = [
  {
    amount: { value: 200, currency: Currency.ETH },
    id: "c0cfdf80-bbba-4512-b5ec-066dfa9529b1",
    requestedAt: daysFromNow(700),
    project: {
      shortDescription: "This project is sooooo awesome",
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
    requestedAt: daysFromNow(1500),
    project: {
      shortDescription: "This project is kind of good",
      id: "fea3c754-bf35-4f2b-aabc-ff345105322e",
      title: "Good Project",
    },
    reason: "https://github.com/open-dust/cairo-foundry/pull/110",
    status: PaymentStatus.WAITING_PAYMENT,
  },
];

const Template: ComponentStory<typeof PayoutTable> = args => (
  <PayoutTable payments={mockPayments} payoutInfoMissing={args.payoutInfoMissing} />
);

export const Default = Template.bind({});

Default.args = {
  payoutInfoMissing: false,
};
