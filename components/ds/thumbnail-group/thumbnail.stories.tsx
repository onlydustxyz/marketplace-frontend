import type { Meta, StoryObj } from "@storybook/react";

import { ThumbnailGroup } from "./thumbnail-group.tsx";
import { ThumbnailProps } from "./thumbnail.type.ts";

const defaultProps: ThumbnailProps = {
  alt: "alt",
  src: "https://avatars.githubusercontent.com/u/10047061?v=4",
};

const meta: Meta<typeof ThumbnailGroup> = {
  component: ThumbnailGroup,
  title: "Design system/Thumbnail",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThumbnailGroup>;

export const Default: Story = {
  render: args => {
    return <ThumbnailGroup {...defaultProps} type="user" size="m" {...args} />;
  },
};

export const User: Story = {
  render: () => {
    return (
      <div className="flex flex-row items-end gap-2">
        <ThumbnailGroup {...defaultProps} alt="" type="user" size="xs" />
        <ThumbnailGroup {...defaultProps} alt="" type="user" size="s" />
        <ThumbnailGroup {...defaultProps} alt="" type="user" size="m" />
        <ThumbnailGroup {...defaultProps} alt="" type="user" size="l" />
        <ThumbnailGroup {...defaultProps} alt="" type="user" size="xl" />
      </div>
    );
  },
};

export const Project: Story = {
  render: () => {
    return (
      <div className="flex flex-row items-end gap-2">
        <ThumbnailGroup {...defaultProps} alt="" type="project" size="xs" />
        <ThumbnailGroup {...defaultProps} alt="" type="project" size="s" />
        <ThumbnailGroup {...defaultProps} alt="" type="project" size="m" />
        <ThumbnailGroup {...defaultProps} alt="" type="project" size="l" />
        <ThumbnailGroup {...defaultProps} alt="" type="project" size="xl" />
      </div>
    );
  },
};
