import { ComponentProps } from "react";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { contribution } from "../mocks/contribution";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

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
