import type { Meta, StoryObj } from "@storybook/react";

import { Popover } from "./popover";
import { TPopover } from "./popover.types";

type Story = StoryObj<typeof Popover>;

const defaultProps: TPopover.Props = {
  children: <div>Popover</div>,
};

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: "Design system/Popover",
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
    return <Popover {...defaultProps} {...args} />;
  },
};

export default meta;
