import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import { RectAvatar } from "components/ds/rect-avatar/rect-avatar";
import { RectAvatarLoading } from "components/ds/rect-avatar/rect-avatar.loading";

type Story = StoryObj<typeof RectAvatar>;

const defaultProps: ComponentProps<typeof RectAvatar> = {};

const meta: Meta<typeof RectAvatar> = {
  component: RectAvatar,
  title: "Design system/RectAvatar",
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
        <RectAvatar {...defaultProps} {...args} size="s" />
        <RectAvatar {...defaultProps} {...args} size="m" />
        <RectAvatar {...defaultProps} {...args} size="l" />
      </div>
    );
  },
};

export const Loading: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <RectAvatar {...defaultProps} {...args} isLoading />
      </div>
    );
  },
};

export const Skeleton: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <div className="flex items-center gap-2">
          <RectAvatarLoading {...args} size="s" />
          <RectAvatarLoading {...args} size="m" />
          <RectAvatarLoading {...args} size="l" />
        </div>
        <div className="flex items-center gap-2">
          <RectAvatarLoading {...args} size="s" skeletonProps={{ color: "grey" }} />
          <RectAvatarLoading {...args} size="m" skeletonProps={{ color: "grey" }} />
          <RectAvatarLoading {...args} size="l" skeletonProps={{ color: "grey" }} />
        </div>
      </div>
    );
  },
};

export default meta;
