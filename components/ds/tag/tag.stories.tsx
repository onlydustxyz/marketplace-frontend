import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "components/layout/icon/icon";

import { Tag } from "./tag";
import { TagLoading } from "./tag.loading";
import { TTag } from "./tag.types";

const defaultProps: TTag.Props = {
  children: <span>Tag</span>,
};

const defaultPropsWithIcon = (): TTag.Props => ({
  children: (
    <>
      <Icon remixName="ri-user-3-line" size={14} />
      <span>Tag</span>
    </>
  ),
});

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: "Design system/Tag",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  render: args => {
    return <Tag {...defaultProps} {...args} />;
  },
};

export const Grey: Story = {
  render: () => {
    return (
      <div className="start row flex gap-6">
        <div className="start flex flex-col gap-4">
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="small" borderColor="grey" color="grey" />
            <TagLoading {...defaultProps} size="small" borderColor="grey" color="grey" />
            <Tag {...defaultPropsWithIcon()} size="small" borderColor="grey" color="grey" />
          </div>
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="medium" borderColor="grey" color="grey" />
            <Tag {...defaultPropsWithIcon()} size="medium" borderColor="grey" color="grey" />
          </div>
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="large" borderColor="grey" color="grey" />
            <Tag {...defaultPropsWithIcon()} size="large" borderColor="grey" color="grey" />
          </div>
        </div>
      </div>
    );
  },
};

export const Orange: Story = {
  render: () => {
    return (
      <div className="start row flex gap-6">
        <div className="start flex flex-col gap-4">
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="small" borderColor="orange" color="grey" />
            <Tag {...defaultPropsWithIcon()} size="small" borderColor="orange" color="grey" />
          </div>
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="medium" borderColor="orange" color="grey" />
            <Tag {...defaultPropsWithIcon()} size="medium" borderColor="orange" color="grey" />
          </div>
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="large" borderColor="orange" color="grey" />
            <Tag {...defaultPropsWithIcon()} size="large" borderColor="orange" color="grey" />
          </div>
        </div>{" "}
        <div className="start flex flex-col gap-4">
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="small" borderColor="orange" color="orange" />
            <Tag {...defaultPropsWithIcon()} size="small" borderColor="orange" color="orange" />
          </div>
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="medium" borderColor="orange" color="orange" />
            <Tag {...defaultPropsWithIcon()} size="medium" borderColor="orange" color="orange" />
          </div>
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="large" borderColor="orange" color="orange" />
            <Tag {...defaultPropsWithIcon()} size="large" borderColor="orange" color="orange" />
          </div>
        </div>
      </div>
    );
  },
};

export const MultiColor: Story = {
  render: () => {
    return (
      <div className="start row flex gap-6">
        <div className="start flex flex-col gap-4">
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="small" borderColor="multi-color" color="grey" />
            <Tag {...defaultPropsWithIcon()} size="small" borderColor="multi-color" color="grey" />
          </div>
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="medium" borderColor="multi-color" color="grey" />
            <Tag {...defaultPropsWithIcon()} size="medium" borderColor="multi-color" color="grey" />
          </div>
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="large" borderColor="multi-color" color="grey" />
            <Tag {...defaultPropsWithIcon()} size="large" borderColor="multi-color" color="grey" />
          </div>
        </div>
      </div>
    );
  },
};

export const Opaque: Story = {
  render: () => {
    return (
      <div className="start row flex gap-6">
        <div className="start flex flex-col gap-4">
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="small" borderColor="grey" color="grey" isOpaque />
            <Tag {...defaultPropsWithIcon()} size="small" borderColor="grey" color="grey" isOpaque />
          </div>
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="medium" borderColor="grey" color="grey" isOpaque />
            <Tag {...defaultPropsWithIcon()} size="medium" borderColor="grey" color="grey" isOpaque />
          </div>
          <div className="row flex items-end gap-4">
            <Tag {...defaultProps} size="large" borderColor="grey" color="grey" isOpaque />
            <Tag {...defaultPropsWithIcon()} size="large" borderColor="grey" color="grey" isOpaque />
          </div>
        </div>
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => {
    return (
      <div className="start row flex gap-6">
        <div className="start flex flex-col gap-4">
          <Tag {...defaultProps} size="small" borderColor="grey" color="grey" />
          <Tag {...defaultProps} size="medium" borderColor="grey" color="grey" />
          <Tag {...defaultProps} size="large" borderColor="grey" color="grey" />
        </div>
        <div className="start flex flex-col gap-4">
          <TagLoading size="small" borderColor="grey" color="grey" />
          <TagLoading size="medium" borderColor="grey" color="grey" />
          <TagLoading size="large" borderColor="grey" color="grey" />
        </div>
        <div className="start flex flex-col gap-4">
          <TagLoading size="small" borderColor="grey" color="grey" skeletonProps={{ color: "grey" }} />
          <TagLoading size="medium" borderColor="grey" color="grey" skeletonProps={{ color: "grey" }} />
          <TagLoading size="large" borderColor="grey" color="grey" skeletonProps={{ color: "grey" }} />
        </div>
      </div>
    );
  },
};
