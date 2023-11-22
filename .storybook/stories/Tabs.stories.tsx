import { ComponentProps } from "react";

import { Tabs } from "src/components/Tabs/Tabs";

export default {
  title: "Tabs",
  component: Tabs,
};

const defaultProps: ComponentProps<typeof Tabs> = {
  tabs: [
    {
      active: true,
      onClick: () => {},
      children: "Tab 1",
    },
    {
      active: false,
      onClick: () => {},
      children: "Tab 2",
    },
    {
      active: false,
      onClick: () => {},
      children: "Tab 3",
    },
  ],
  variant: "grey",
  showMobile: true,
  mobileTitle: "Mobile Title",
};

export const Default = {
  render: (args: typeof Tabs) => <Tabs {...defaultProps} {...args} />,
};

export const Blue = {
  render: (args: typeof Tabs) => <Tabs {...defaultProps} variant="blue" {...args} />,
};
