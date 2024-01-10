import type { Meta, StoryObj } from "@storybook/react";

import { Thumbnail } from "./thumbnail";
import { TThumbnail } from "./thumbnail.types.ts";
import { ThumbnailLoading } from "@/components/ds/thumbnail/thumbnail.loading.tsx";

const defaultProps: TThumbnail.Props = {
  alt: "alt",
  src: "https://avatars.githubusercontent.com/u/10047061?v=4",
};

const meta: Meta<typeof Thumbnail> = {
  component: Thumbnail,
  title: "Design system/Thumbnail",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
  },
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
      <div className="start flex flex-col gap-2">
        <div className="flex flex-row items-end gap-2">
          <Thumbnail {...defaultProps} alt="" type="user" size="xs" />
          <Thumbnail {...defaultProps} alt="" type="user" size="s" />
          <Thumbnail {...defaultProps} alt="" type="user" size="m" />
          <Thumbnail {...defaultProps} alt="" type="user" size="l" />
          <Thumbnail {...defaultProps} alt="" type="user" size="xl" />
        </div>
        <div className="flex flex-row items-end gap-2">
          <ThumbnailLoading type="user" size="xs" />
          <ThumbnailLoading type="user" size="s" />
          <ThumbnailLoading type="user" size="m" />
          <ThumbnailLoading type="user" size="l" />
          <ThumbnailLoading type="user" size="xl" />
        </div>
        <div className="flex flex-row items-end gap-2">
          <ThumbnailLoading type="user" size="xs" skeletonProps={{ color: "grey" }} />
          <ThumbnailLoading type="user" size="s" skeletonProps={{ color: "grey" }} />
          <ThumbnailLoading type="user" size="m" skeletonProps={{ color: "grey" }} />
          <ThumbnailLoading type="user" size="l" skeletonProps={{ color: "grey" }} />
          <ThumbnailLoading type="user" size="xl" skeletonProps={{ color: "grey" }} />
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
          <Thumbnail {...defaultProps} alt="" type="project" size="xs" />
          <Thumbnail {...defaultProps} alt="" type="project" size="s" />
          <Thumbnail {...defaultProps} alt="" type="project" size="m" />
          <Thumbnail {...defaultProps} alt="" type="project" size="l" />
          <Thumbnail {...defaultProps} alt="" type="project" size="xl" />
        </div>
        <div className="flex flex-row items-end gap-2">
          <ThumbnailLoading type="project" size="xs" />
          <ThumbnailLoading type="project" size="s" />
          <ThumbnailLoading type="project" size="m" />
          <ThumbnailLoading type="project" size="l" />
          <ThumbnailLoading type="project" size="xl" />
        </div>
        <div className="flex flex-row items-end gap-2">
          <ThumbnailLoading type="project" size="xs" skeletonProps={{ color: "grey" }} />
          <ThumbnailLoading type="project" size="s" skeletonProps={{ color: "grey" }} />
          <ThumbnailLoading type="project" size="m" skeletonProps={{ color: "grey" }} />
          <ThumbnailLoading type="project" size="l" skeletonProps={{ color: "grey" }} />
          <ThumbnailLoading type="project" size="xl" skeletonProps={{ color: "grey" }} />
        </div>
      </div>
    );
  },
};
