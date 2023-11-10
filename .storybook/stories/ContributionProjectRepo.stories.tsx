import { ComponentProps } from "react";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import { withRouter } from "storybook-addon-react-router-v6";
import { contribution } from "../mocks/contribution";

export default {
  title: "ContributionProjectRepo",
  component: ContributionProjectRepo,
  decorators: [withRouter],
};

const defaultProps: ComponentProps<typeof ContributionProjectRepo> = {
  project: contribution.project,
  repo: contribution.repo,
};

export const Default = {
  render: (args: typeof ContributionProjectRepo) => <ContributionProjectRepo {...defaultProps} {...args} />,
};
