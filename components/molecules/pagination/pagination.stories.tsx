import { Meta, StoryObj } from "@storybook/react";

import { PaginationPort } from "./pagination.types";
import { Pagination } from "./variants/pagination-default";

type Story = StoryObj<typeof Pagination>;

const defaultProps: PaginationPort<"div"> = {};

const meta: Meta<typeof Pagination> = {
  component: Pagination,
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
        <Pagination {...defaultProps} disableNext={true} />
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
        <Pagination {...defaultProps} disablePrev={true} />
      </div>
    );
  },
};

export const Infinite: Story = {
  parameters: {
    docs: {
      source: { code: "<Pagination isInfinite />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <Pagination {...defaultProps} isInfinite />
      </div>
    );
  },
};
export default meta;
