import { Meta, StoryObj } from "@storybook/react";

import { StepperDefaultAdapter } from "./adapters/default/default.adapter";
import { StepperLoading } from "./stepper.loading";
import { StepperPort } from "./stepper.types";

type Story = StoryObj<typeof StepperDefaultAdapter>;

const defaultProps: StepperPort = {
  steps: [
    { min: 0, max: 100, value: 100 },
    { min: 0, max: 100, value: 100 },
    { min: 0, max: 100, value: 0 },
  ],
};

const meta: Meta<typeof StepperDefaultAdapter> = {
  component: StepperDefaultAdapter,
  title: "Molecules/Stepper",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
  parameters: {
    docs: {
      source: { code: "<StepperDefaultAdapter />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <StepperDefaultAdapter {...args} />
      </div>
    );
  },
};

export const HalfStep: Story = {
  args: {
    steps: [
      { min: 0, max: 100, value: 100 },
      { min: 0, max: 100, value: 50 },
      { min: 0, max: 100, value: 0 },
    ],
  },
  parameters: {
    docs: {
      source: {
        code: "<StepperDefaultAdapter steps={[{ min: 0, max: 100, value: 100 }, { min: 0, max: 100, value: 50 }, { min: 0, max: 100, value: 0 }]} />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <StepperDefaultAdapter {...args} />
      </div>
    );
  },
};

export const CustomColor: Story = {
  args: {
    ...defaultProps,
    color: "brand-1",
  },
  parameters: {
    docs: {
      source: { code: "<StepperDefaultAdapter color='brand-1' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <StepperDefaultAdapter {...args} />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<StepperLoading height={8} />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <StepperLoading height={8} />
      </div>
    );
  },
};

export default meta;
