import { Meta, StoryObj } from "@storybook/react";

import { BadgeLoading } from "components/atoms/badge/badge.loading";

import { BadgeCore } from "./badge.core";
import { TBadgeProps } from "./badge.types";
import { Badge } from "./variants/badge-default";
import { BadgeDot } from "./variants/badge-dot";

type Story = StoryObj<typeof BadgeCore>;

const defaultProps: TBadgeProps<"div"> = {
  children: "2",
};

const meta: Meta<typeof BadgeCore> = {
  component: BadgeCore,
  title: "Atoms/Badge",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#1E1E1E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Badge />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Badge {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Size: Story = {
  parameters: {
    docs: {
      source: { code: "<Badge size='s' />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <BadgeCore {...defaultProps} size={"s"} />
        <BadgeCore {...defaultProps} size={"m"} />
      </div>
    );
  },
};

export const FitContent: Story = {
  parameters: {
    docs: {
      source: { code: "<Badge fitContent />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <BadgeCore {...defaultProps} size={"s"} fitContent={true}>
          99999
        </BadgeCore>
        <BadgeCore {...defaultProps} fitContent={true}>
          99999
        </BadgeCore>
      </div>
    );
  },
};
export const Colors: Story = {
  parameters: {
    docs: {
      source: { code: "<Badge colors='outline' />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <BadgeCore {...defaultProps} colors={"default"} />
        <BadgeCore {...defaultProps} colors={"brand1"} />
        <BadgeCore {...defaultProps} colors={"brand2"} />
        <BadgeCore {...defaultProps} colors={"brand3"} />
        <BadgeCore {...defaultProps} colors={"brand4"} />
      </div>
    );
  },
};

export const Outline: Story = {
  parameters: {
    docs: {
      source: { code: "<Badge style='outline' />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <BadgeCore {...defaultProps} colors={"default"} style={"outline"} />
        <BadgeCore {...defaultProps} colors={"brand1"} style={"outline"} />
        <BadgeCore {...defaultProps} colors={"brand2"} style={"outline"} />
        <BadgeCore {...defaultProps} colors={"brand3"} style={"outline"} />
        <BadgeCore {...defaultProps} colors={"brand4"} style={"outline"} />
      </div>
    );
  },
};

export const Dot: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeDot />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <BadgeDot {...defaultProps} colors={"default"} />
          <BadgeDot {...defaultProps} colors={"default"} style={"outline"} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <BadgeDot {...defaultProps} colors={"brand1"} />
          <BadgeDot {...defaultProps} colors={"brand1"} style={"outline"} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <BadgeDot {...defaultProps} colors={"brand2"} />
          <BadgeDot {...defaultProps} colors={"brand2"} style={"outline"} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <BadgeDot {...defaultProps} colors={"brand3"} />
          <BadgeDot {...defaultProps} colors={"brand3"} style={"outline"} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <BadgeDot {...defaultProps} colors={"brand4"} />
          <BadgeDot {...defaultProps} colors={"brand4"} style={"outline"} />
        </div>
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <BadgeLoading size={"s"} />
        <BadgeLoading size={"m"} />
      </div>
    );
  },
};

export default meta;
