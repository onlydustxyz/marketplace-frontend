import type { Meta, StoryObj } from "@storybook/react";

import { ThumbnailGroup } from "./thumbnail-group.tsx";
import { ThumbnailGroupProps } from "./thumbnail-group.type.ts";
import ThumbnailGroupLoading from "@/components/ds/thumbnail-group/thumbnail-group.loading.tsx";

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
      <div className="start flex flex-col gap-2">
        <div className="flex flex-row items-end gap-2">
          <ThumbnailGroup {...defaultProps} type="user" size="xs" />
          <ThumbnailGroup {...defaultProps} type="user" size="s" />
          <ThumbnailGroup {...defaultProps} type="user" size="m" />
          <ThumbnailGroup {...defaultProps} type="user" size="l" />
          <ThumbnailGroup {...defaultProps} type="user" size="xl" />
        </div>
        <div className="flex flex-row items-end gap-2">
          <ThumbnailGroupLoading type="user" size="xs" />
          <ThumbnailGroupLoading type="user" size="s" />
          <ThumbnailGroupLoading type="user" size="m" />
          <ThumbnailGroupLoading type="user" size="l" />
          <ThumbnailGroupLoading type="user" size="xl" />
        </div>
        <div className="flex flex-row items-end gap-2">
          <ThumbnailGroupLoading type="user" size="xs" skeletonProps={{ color: "grey" }} />
          <ThumbnailGroupLoading type="user" size="s" skeletonProps={{ color: "grey" }} />
          <ThumbnailGroupLoading type="user" size="m" skeletonProps={{ color: "grey" }} />
          <ThumbnailGroupLoading type="user" size="l" skeletonProps={{ color: "grey" }} />
          <ThumbnailGroupLoading type="user" size="xl" skeletonProps={{ color: "grey" }} />
        </div>
      </div>
    );
  },
};

export const Project: Story = {
  render: () => {
    return (
      <div className="start flex flex-col gap-2">
        <div className="flex flex-row items-end gap-2">
          <ThumbnailGroup {...defaultProps} type="project" size="xs" />
          <ThumbnailGroup {...defaultProps} type="project" size="s" />
          <ThumbnailGroup {...defaultProps} type="project" size="m" />
          <ThumbnailGroup {...defaultProps} type="project" size="l" />
          <ThumbnailGroup {...defaultProps} type="project" size="xl" />
        </div>
        <div className="flex flex-row items-end gap-2">
          <ThumbnailGroupLoading type="project" size="xs" />
          <ThumbnailGroupLoading type="project" size="s" />
          <ThumbnailGroupLoading type="project" size="m" />
          <ThumbnailGroupLoading type="project" size="l" />
          <ThumbnailGroupLoading type="project" size="xl" />
        </div>
        <div className="flex flex-row items-end gap-2">
          <ThumbnailGroupLoading type="project" size="xs" skeletonProps={{ color: "grey" }} />
          <ThumbnailGroupLoading type="project" size="s" skeletonProps={{ color: "grey" }} />
          <ThumbnailGroupLoading type="project" size="m" skeletonProps={{ color: "grey" }} />
          <ThumbnailGroupLoading type="project" size="l" skeletonProps={{ color: "grey" }} />
          <ThumbnailGroupLoading type="project" size="xl" skeletonProps={{ color: "grey" }} />
        </div>
      </div>
    );
  },
};
