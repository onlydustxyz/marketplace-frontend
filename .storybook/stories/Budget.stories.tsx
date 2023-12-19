import { ComponentProps } from "react";
import { Budget } from "src/pages/ProjectDetails/Rewards/Budget/Budget";
import { Currency } from "src/types";

export default {
  title: "Budget",
  component: Budget,
};

const mockBudget = {
  remainingBudget: {
    amount: 10000,
    currency: Currency.USD,
    usdEquivalent: 1000,
  },
  spentAmount: { amount: 5000, currency: Currency.USD, usdEquivalent: 1000 },
  sentRewards: {
    count: 10,
    total: 50,
  },
  rewardedContributorsCount: 10,
};

const mockEthBudget = {
  ...mockBudget,
  remainingBudget: { ...mockBudget.remainingBudget, currency: Currency.ETH },
  spentAmount: { ...mockBudget.remainingBudget, currency: Currency.ETH },
};

const mockOPBudget = {
  ...mockBudget,
  remainingBudget: { ...mockBudget.remainingBudget, currency: Currency.OP },
  spentAmount: { ...mockBudget.remainingBudget, currency: Currency.OP },
};

const mockAPTBudget = {
  ...mockBudget,
  remainingBudget: { ...mockBudget.remainingBudget, currency: Currency.APT },
  spentAmount: { ...mockBudget.remainingBudget, currency: Currency.APT },
};

const mockStarkBudget = {
  ...mockBudget,
  remainingBudget: { ...mockBudget.remainingBudget, currency: Currency.STARK },
  spentAmount: { ...mockBudget.remainingBudget, currency: Currency.STARK },
};

const mockLordsBudget = {
  ...mockBudget,
  remainingBudget: { ...mockBudget.remainingBudget, currency: Currency.LORDS },
  spentAmount: { ...mockBudget.remainingBudget, currency: Currency.LORDS },
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
