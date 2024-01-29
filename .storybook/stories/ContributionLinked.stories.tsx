import { ComponentProps } from "react";

import { ContributionLinked } from "src/components/Contribution/ContributionLinked";

import { contribution } from "../mocks/contribution";

export default {
  title: "ContributionLinked",
  component: ContributionLinked,
};

const defaultProps: ComponentProps<typeof ContributionLinked> = {
  contribution,
};

export const Default = {
  render: (args: typeof ContributionLinked) => <ContributionLinked {...defaultProps} {...args} />,
};
