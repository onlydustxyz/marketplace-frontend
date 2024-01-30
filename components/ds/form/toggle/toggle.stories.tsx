import type { Meta, StoryObj } from "@storybook/react";

import { Toggle } from "./toggle";
import { TToggle } from "./toggle.types";

type Story = StoryObj<typeof Toggle>;

const defaultProps: TToggle.Props = {
  children: <div>Toggle</div>,
};

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: "Design system/Toggle",
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
    return <Toggle {...defaultProps} {...args} />;
  },
};

export default meta;
