import { Meta, StoryObj } from "@storybook/react";

import { TagCore } from "./tag.core";
import { TTagProps } from "./tag.types";
import { Tag } from "./variants/tag-default";

type Story = StoryObj<typeof TagCore>;

const defaultProps: TTagProps<"div"> = {};

const meta: Meta<typeof TagCore> = {
  component: TagCore,
  title: "Atoms/Tag",
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
      <div className="flex w-full items-center gap-2">
        <Tag {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Core: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <TagCore {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
