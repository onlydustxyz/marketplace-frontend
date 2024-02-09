import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import { AvatarGroupLoading } from "components/ds/avatar-group/avatar-group.loading";

import { AvatarGroup } from "./avatar-group";

type Story = StoryObj<typeof AvatarGroup>;

const defaultProps: ComponentProps<typeof AvatarGroup> = {
  avatars: [{ src: "" }, { src: "" }, { src: "" }],
};

const meta: Meta<typeof AvatarGroup> = {
  component: AvatarGroup,
  title: "Design system/AvatarGroup",
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
        <AvatarGroup {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Skeleton: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <div className="flex items-center gap-2">
          <AvatarGroupLoading {...args} size="xs" />
          <AvatarGroupLoading {...args} size="s" />
          <AvatarGroupLoading {...args} size="m" />
          <AvatarGroupLoading {...args} size="l" />
          <AvatarGroupLoading {...args} size="xl" />
        </div>
        <div className="flex items-center gap-2">
          <AvatarGroupLoading {...args} size="xs" skeletonProps={{ color: "grey" }} />
          <AvatarGroupLoading {...args} size="s" skeletonProps={{ color: "grey" }} />
          <AvatarGroupLoading {...args} size="m" skeletonProps={{ color: "grey" }} />
          <AvatarGroupLoading {...args} size="l" skeletonProps={{ color: "grey" }} />
          <AvatarGroupLoading {...args} size="xl" skeletonProps={{ color: "grey" }} />
        </div>
      </div>
    );
  },
};

export default meta;
