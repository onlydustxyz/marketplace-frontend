import { ComponentProps } from "react";
import { RemainingBudget } from "src/_pages/ProjectDetails/Rewards/RemainingBudget/RemainingBudget";

export default {
  title: "RemainingBudget",
  component: RemainingBudget,
};

const defaultProps: ComponentProps<typeof RemainingBudget> = {
  projectId: "79c544b6-4957-42b7-92ae-12dcfda575d8",
};

const ethereumProps: ComponentProps<typeof RemainingBudget> = {
  projectId: "79c544b6-4957-42b7-92ae-12dcfda575d8",
};

export const Default = {
  render: (args: ComponentProps<typeof RemainingBudget>) => <RemainingBudget {...defaultProps} {...args} />,
};

export const Cryptos = {
  render: (args: ComponentProps<typeof RemainingBudget>) => <RemainingBudget {...ethereumProps} {...args} />,
};
