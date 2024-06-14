import { Meta, StoryObj } from "@storybook/react";

import { PaginationCore } from "./pagination.core";
import { TPaginationProps } from "./pagination.types";
import { Pagination } from "./variants/pagination-default";

type Story = StoryObj<typeof PaginationCore>;

const defaultProps: TPaginationProps<"div"> = {};

const meta: Meta<typeof PaginationCore> = {
  component: PaginationCore,
  title: "Molecules/Pagination",
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
      source: { code: "<Pagination />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Pagination {...defaultProps} {...args} />
      </div>
    );
  },
};

export const DisableNext: Story = {
  parameters: {
    docs: {
      source: { code: "<Pagination disableNext={true} />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <PaginationCore {...defaultProps} disableNext={true} />
      </div>
    );
  },
};

export const DisablePrev: Story = {
  parameters: {
    docs: {
      source: { code: "<Pagination disablePrev={true} />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <PaginationCore {...defaultProps} disablePrev={true} />
      </div>
    );
  },
};

export const Infinite: Story = {
  parameters: {
    docs: {
      source: { code: "<infinite disablePrev={true} />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <PaginationCore {...defaultProps} infinite={true} />
      </div>
    );
  },
};
export default meta;
