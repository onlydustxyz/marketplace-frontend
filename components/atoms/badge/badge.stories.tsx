import { Meta, StoryObj } from "@storybook/react";

import { BadgeLoading } from "components/atoms/badge/badge.loading";

import { BadgePort } from "./badge.types";
import { Badge } from "./variants/badge-default";
import { BadgeDot } from "./variants/badge-dot";

type Story = StoryObj<typeof Badge>;

const defaultProps: BadgePort<"div"> = {
  children: "2",
};

const meta: Meta<typeof Badge> = {
  component: Badge,
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
        <Badge {...defaultProps} size={"s"} />
        <Badge {...defaultProps} size={"m"} />
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
        <Badge {...defaultProps} size={"s"} fitContent={true}>
          99999
        </Badge>
        <Badge {...defaultProps} fitContent={true}>
          99999
        </Badge>
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
        <Badge {...defaultProps} colors={"default"} />
        <Badge {...defaultProps} colors={"brand-1"} />
        <Badge {...defaultProps} colors={"brand-2"} />
        <Badge {...defaultProps} colors={"brand-3"} />
        <Badge {...defaultProps} colors={"brand-4"} />
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
        <Badge {...defaultProps} colors={"default"} style={"outline"} />
        <Badge {...defaultProps} colors={"brand-1"} style={"outline"} />
        <Badge {...defaultProps} colors={"brand-2"} style={"outline"} />
        <Badge {...defaultProps} colors={"brand-3"} style={"outline"} />
        <Badge {...defaultProps} colors={"brand-4"} style={"outline"} />
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
          <BadgeDot {...defaultProps} colors={"brand-1"} />
          <BadgeDot {...defaultProps} colors={"brand-1"} style={"outline"} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <BadgeDot {...defaultProps} colors={"brand-2"} />
          <BadgeDot {...defaultProps} colors={"brand-2"} style={"outline"} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <BadgeDot {...defaultProps} colors={"brand-3"} />
          <BadgeDot {...defaultProps} colors={"brand-3"} style={"outline"} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <BadgeDot {...defaultProps} colors={"brand-4"} />
          <BadgeDot {...defaultProps} colors={"brand-4"} style={"outline"} />
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
