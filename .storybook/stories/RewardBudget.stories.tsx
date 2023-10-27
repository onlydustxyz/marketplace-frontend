import { ComponentProps } from "react";
import { RewardBudget } from "src/components/RewardBudget/RewardBudget";

export default {
  title: "RewardBudget",
  component: RewardBudget,
  parameters: {
    backgrounds: {
      default: "rewards-page",
      values: [{ name: "rewards-page", value: "#0B0D20" }],
    },
  },
};

const defaultProps: ComponentProps<typeof RewardBudget> = {
  initialDollarsEquivalent: 10,
  remainingDollarsEquivalent: 10,
  budgets: [
    {
      currency: "APT",
      initialAmount: 20,
      initialDollarsEquivalent: 20,
      remaining: 20,
      remainingDollarsEquivalent: 20,
    },
    {
      currency: "ETH",
      initialAmount: 20,
      initialDollarsEquivalent: 20,
      remaining: 20,
      remainingDollarsEquivalent: 20,
    },
    {
      currency: "USD",
      initialAmount: 20,
      initialDollarsEquivalent: 20,
      remaining: 20,
      remainingDollarsEquivalent: 20,
    },
  ],
};

export const Default = {
  render: (args: ComponentProps<typeof RewardBudget>) => (
    <div style={{ width: 384 }}>
      <RewardBudget {...defaultProps} {...args} />
    </div>
  ),
};
