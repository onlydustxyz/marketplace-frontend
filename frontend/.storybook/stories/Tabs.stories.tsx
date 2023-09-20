import { Tabs } from "src/components/Tabs/Tabs";

export default {
  title: "Tabs",
  component: Tabs,
};

const defaultProps: React.ComponentProps<typeof Tabs> = {
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
  mobileTitle: "Mobile Title",
};

export const Default = {
  render: (args: typeof Tabs) => <Tabs {...defaultProps} {...args} />,
};

export const Blue = {
  render: (args: typeof Tabs) => <Tabs {...defaultProps} variant="blue" {...args} />,
};
