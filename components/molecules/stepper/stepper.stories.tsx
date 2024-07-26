import { Meta, StoryObj } from "@storybook/react";

import { StepperPort } from "./stepper.types";
import { Stepper } from "./variants/stepper-default";

type Story = StoryObj<typeof Stepper>;

const defaultProps: StepperPort<"div"> = {};

const meta: Meta<typeof Stepper> = {
  component: Stepper,
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
  parameters: {
    docs: {
      source: { code: "<Stepper />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Stepper {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
