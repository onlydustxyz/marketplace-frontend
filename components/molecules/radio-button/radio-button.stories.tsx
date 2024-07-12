import { Meta, StoryObj } from "@storybook/react";

import { RadioButtonPort } from "./radio-button.types";
import { RadioButton } from "./variants/radio-button-default";

type Story = StoryObj<typeof RadioButton>;

const defaultProps: RadioButtonPort<string> = {
  value: "Option 1",
  items: [
    {
      value: "Option 1",
      label: "Option 1",
    },
    {
      value: "Option 2",
      label: "Option 2",
    },
  ],
};

const meta: Meta<typeof RadioButton> = {
  component: RadioButton,
  title: "Molecules/RadioButton",
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
      source: { code: "<RadioButton />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <RadioButton {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
