import { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "./progress-bar";
import { TProgressBar } from "./progress-bar.types";

type Story = StoryObj<typeof ProgressBar>;

const defaultProps: TProgressBar.Props = {
  value: 100,
  maxValue: 1000,
};

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "Design system/ProgressBar",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
  },
};

export const Default: Story = {
  render: args => {
    return <ProgressBar {...defaultProps} {...args} />;
  },
};

export default meta;
