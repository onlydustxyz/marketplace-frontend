import { Meta, StoryObj } from "@storybook/react";

import { Button } from "components/atoms/button/variants/button-default";

import { TooltipPort } from "./tooltip.types";
import { Tooltip } from "./variants/tooltip-default";

type Story = StoryObj<typeof Tooltip>;

const defaultProps: TooltipPort<"div"> = {
  content: "Tooltip content",
};

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: "Atoms/Tooltip",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Tooltip />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Tooltip {...defaultProps} {...args}>
          <Button isDisabled>Show tooltip</Button>
        </Tooltip>
      </div>
    );
  },
};

export default meta;
