import type { Meta, StoryObj } from "@storybook/react";

import { Popover } from "./popover";
import { TPopover } from "./popover.types";
import { Button } from "components/ds/button/button";

type Story = StoryObj<typeof Popover>;

const defaultProps: TPopover.Props = {
  children: <Button as={"div"}>Open PopOver</Button>,
  content: (
    <div className="px-4">
      <p>Pop over content</p>
    </div>
  ),
};

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: "Design system/Modals/Popover",
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
    return (
      <div className="h-[500px]">
        <Popover {...defaultProps} {...args}>
          <Button as={"div"}>Open PopOver</Button>
        </Popover>
      </div>
    );
  },
};

export default meta;
