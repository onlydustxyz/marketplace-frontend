import { Meta, StoryObj } from "@storybook/react";

import { ProgressBarLoading } from "./progress-bar.loading";
import { ProgressBarPort } from "./progress-bar.types";
import { ProgressBar } from "./variants/progress-bar-default";

type Story = StoryObj<typeof ProgressBar>;

const defaultProps: ProgressBarPort = {
  min: 0,
  max: 100,
  value: 50,
};

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "Atoms/ProgressBar",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<ProgressBar />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <ProgressBar {...defaultProps} {...args} />
      </div>
    );
  },
};

export const WithMinAndMax: Story = {
  args: {
    min: 0,
    max: 200,
    value: 75,
  },
  parameters: {
    docs: {
      source: { code: "<ProgressBar min={0} max={200} value={75} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <ProgressBar {...args} />
      </div>
    );
  },
};

export const WithColorChange: Story = {
  args: {
    value: 60,
    color: "brand-1",
  },
  parameters: {
    docs: {
      source: { code: "<ProgressBar value={60} color='brand-1' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <ProgressBar {...args} />
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<ProgressBarLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <ProgressBarLoading />
      </div>
    );
  },
};

export default meta;
