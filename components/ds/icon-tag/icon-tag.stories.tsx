import { Meta, StoryObj } from "@storybook/react";

import { IconTag } from "components/ds/icon-tag/icon-tag";
import { TIconTag } from "components/ds/icon-tag/icon-tag.types";

const defaultProps: TIconTag.Props = {
  remixName: "ri-seedling-line",
  size: "medium",
  active: false,
};

const activeProps: TIconTag.Props = {
  remixName: "ri-rocket-2-line",
  size: "medium",
  active: true,
};

const tooltipProps: TIconTag.Props = {
  remixName: "ri-hand-coin-line",
  size: "medium",
  tooltipContent: "Tooltip content",
};

const meta: Meta<typeof IconTag> = {
  component: IconTag,
  title: "Design system/IconTag",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconTag>;

export const Default: Story = {
  render: () => {
    return <IconTag {...defaultProps} />;
  },
};

export const ActiveIconTag: Story = {
  render: () => {
    return <IconTag {...activeProps} />;
  },
};

export const TooltipIconTag: Story = {
  render: () => {
    return <IconTag {...tooltipProps} />;
  },
};
