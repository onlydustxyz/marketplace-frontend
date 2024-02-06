import { Tabs } from "./tabs";
import { TTabs } from "./tabs.types";
import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof Tabs>;

const defaultProps: TTabs.Props = {
  children: <div>Tabs</div>,
};

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: "Design system/Tabs",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
  },
};

export const Default: Story = {
  render: (args) => {
    return <Tabs {...defaultProps} {...args} />;
  },
};

export default meta;
