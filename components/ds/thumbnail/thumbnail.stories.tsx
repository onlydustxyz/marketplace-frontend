import type { Meta, StoryObj } from "@storybook/react";

import { Thumbnail } from "./thumbnail";
import { ThumbnailProps } from "./thumbnail.type.ts";

const defaultProps: ThumbnailProps = {
  alt: "alt",
  src: "https://avatars.githubusercontent.com/u/10047061?v=4",
};

const meta: Meta<typeof Thumbnail> = {
  component: Thumbnail,
  title: "Design system/Thumbnail",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Thumbnail>;

export const Default: Story = {
  render: args => {
    return <Thumbnail {...defaultProps} type="user" size="m" {...args} />;
  },
};

export const User: Story = {
  render: () => {
    return (
      <div className="flex flex-row items-end gap-2">
        <Thumbnail {...defaultProps} alt="" type="user" size="xs" />
        <Thumbnail {...defaultProps} alt="" type="user" size="s" />
        <Thumbnail {...defaultProps} alt="" type="user" size="m" />
        <Thumbnail {...defaultProps} alt="" type="user" size="l" />
        <Thumbnail {...defaultProps} alt="" type="user" size="xl" />
      </div>
    );
  },
};

export const Project: Story = {
  render: () => {
    return (
      <div className="flex flex-row items-end gap-2">
        <Thumbnail {...defaultProps} alt="" type="project" size="xs" />
        <Thumbnail {...defaultProps} alt="" type="project" size="s" />
        <Thumbnail {...defaultProps} alt="" type="project" size="m" />
        <Thumbnail {...defaultProps} alt="" type="project" size="l" />
        <Thumbnail {...defaultProps} alt="" type="project" size="xl" />
      </div>
    );
  },
};
