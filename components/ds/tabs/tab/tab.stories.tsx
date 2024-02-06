import { Tab } from "./tab";
import { TTab } from "./tab.types";
import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof Tab>;

const defaultProps: TTab.Props = {
  children: <div>Tab</div>,
};

const meta: Meta<typeof Tab> = {
  component: Tab,
  title: "Design system/Tab",
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
    return <Tab {...defaultProps} {...args} />;
  },
};

export default meta;
