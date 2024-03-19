import { ComponentProps } from "react";
import { Money } from "utils/Money";

import { Budget } from "src/_pages/ProjectDetails/Rewards/Budget/Budget";

export default {
  title: "Budget",
  component: Budget,
};

const mockBudget = {
  remainingBudget: {
    amount: 10000,
    currency: Money.fromSchema({ code: Money.Static.Currency.USD }),
    usdEquivalent: 1000,
  },
  spentAmount: { amount: 5000, currency: Money.fromSchema({ code: Money.Static.Currency.USD }), usdEquivalent: 1000 },
  sentRewards: {
    count: 10,
    total: 50,
  },
  rewardedContributorsCount: 10,
};

const mockEthBudget = {
  ...mockBudget,
  remainingBudget: { ...mockBudget.remainingBudget, currency: Money.fromSchema({ code: Money.Static.Currency.ETH }) },
  spentAmount: { ...mockBudget.remainingBudget, currency: Money.fromSchema({ code: Money.Static.Currency.ETH }) },
};

const mockOPBudget = {
  ...mockBudget,
  remainingBudget: { ...mockBudget.remainingBudget, currency: Money.fromSchema({ code: Money.Static.Currency.OP }) },
  spentAmount: { ...mockBudget.remainingBudget, currency: Money.fromSchema({ code: Money.Static.Currency.OP }) },
};

const mockAPTBudget = {
  ...mockBudget,
  remainingBudget: { ...mockBudget.remainingBudget, currency: Money.fromSchema({ code: Money.Static.Currency.APT }) },
  spentAmount: { ...mockBudget.remainingBudget, currency: Money.fromSchema({ code: Money.Static.Currency.APT }) },
};

const mockStarkBudget = {
  ...mockBudget,
  remainingBudget: { ...mockBudget.remainingBudget, currency: Money.fromSchema({ code: Money.Static.Currency.STRK }) },
  spentAmount: { ...mockBudget.remainingBudget, currency: Money.fromSchema({ code: Money.Static.Currency.STRK }) },
};

const mockLordsBudget = {
  ...mockBudget,
  remainingBudget: { ...mockBudget.remainingBudget, currency: Money.fromSchema({ code: Money.Static.Currency.LORDS }) },
  spentAmount: { ...mockBudget.remainingBudget, currency: Money.fromSchema({ code: Money.Static.Currency.LORDS }) },
};

export const Default = {
  render: (args: ComponentProps<typeof Budget>) => <Budget {...mockBudget} {...args} />,
};

export const EthBudget = {
  render: (args: ComponentProps<typeof Budget>) => <Budget {...mockEthBudget} {...args} />,
};

export const AptBudget = {
  render: (args: ComponentProps<typeof Budget>) => <Budget {...mockAPTBudget} {...args} />,
};

export const OpBudget = {
  render: (args: ComponentProps<typeof Budget>) => <Budget {...mockOPBudget} {...args} />,
};

export const StarknetBudget = {
  render: (args: ComponentProps<typeof Budget>) => <Budget {...mockStarkBudget} {...args} />,
};

export const LordsBudget = {
  render: (args: ComponentProps<typeof Budget>) => <Budget {...mockLordsBudget} {...args} />,
};
