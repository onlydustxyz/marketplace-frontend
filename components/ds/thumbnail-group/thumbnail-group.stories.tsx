import type { Meta, StoryObj } from "@storybook/react";

import { ThumbnailGroup } from "./thumbnail-group.tsx";
import { ThumbnailGroupProps } from "./thumbnail-group.type.ts";

const defaultProps: ThumbnailGroupProps = {
  thumbnails: [
    {
      alt: "alt",
      src: "https://avatars.githubusercontent.com/u/10047061?v=4",
    },
    {
      alt: "alt",
      src: "https://avatars.githubusercontent.com/u/10047061?v=4",
    },
    {
      alt: "alt",
      src: "https://avatars.githubusercontent.com/u/10047061?v=4",
    },
  ],
};

const meta: Meta<typeof ThumbnailGroup> = {
  component: ThumbnailGroup,
  title: "Design system/ThumbnailGroup",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThumbnailGroup>;

export const Default: Story = {
  render: args => {
    return <ThumbnailGroup {...defaultProps} type="user" size="xs" {...args} />;
  },
};

export const User: Story = {
  render: () => {
    return (
      <div className="flex flex-row items-end gap-2">
        <ThumbnailGroup {...defaultProps} type="user" size="xs" />
        <ThumbnailGroup {...defaultProps} type="user" size="s" />
        <ThumbnailGroup {...defaultProps} type="user" size="m" />
        <ThumbnailGroup {...defaultProps} type="user" size="l" />
        <ThumbnailGroup {...defaultProps} type="user" size="xl" />
      </div>
    );
  },
};

export const Project: Story = {
  render: () => {
    return (
      <div className="flex flex-row items-end gap-2">
        <ThumbnailGroup {...defaultProps} type="project" size="xs" />
        <ThumbnailGroup {...defaultProps} type="project" size="s" />
        <ThumbnailGroup {...defaultProps} type="project" size="m" />
        <ThumbnailGroup {...defaultProps} type="project" size="l" />
        <ThumbnailGroup {...defaultProps} type="project" size="xl" />
      </div>
    );
  },
};
