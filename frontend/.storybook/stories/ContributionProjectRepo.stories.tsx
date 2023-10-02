import { ComponentProps } from "react";

import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  title: "ContributionProjectRepo",
  component: ContributionProjectRepo,
  decorators: [withRouter],
};

const defaultProps: ComponentProps<typeof ContributionProjectRepo> = {
  project: {
    key: "onlydust",
    logoUrl: "https://avatars.githubusercontent.com/u/77183114?s=200&v=4",
    name: "OnlyDust",
  },
  repo: {
    htmlUrl: "#",
    name: "test",
  },
};

export const Default = {
  render: (args: typeof ContributionProjectRepo) => <ContributionProjectRepo {...defaultProps} {...args} />,
};
