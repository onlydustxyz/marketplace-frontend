import { ComponentProps } from "react";

import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";

export default {
  title: "ContributionProjectRepo",
  component: ContributionProjectRepo,
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
