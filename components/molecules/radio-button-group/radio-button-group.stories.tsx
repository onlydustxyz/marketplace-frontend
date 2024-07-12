import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { RadioGroupButtonPort } from "./radio-button-group.types";
import { RadioButtonGroup } from "./variants/radio-button-group-default";

type Story = StoryObj<typeof RadioButtonGroup>;

const defaultProps: RadioGroupButtonPort<string> = {
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

const meta: Meta<typeof RadioButtonGroup> = {
  component: RadioButtonGroup,
  title: "Molecules/RadioButtonGroup",
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
      source: { code: "<RadioButtonGroup />" },
    },
  },
  render: args => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="flex w-full items-center gap-2">
        <RadioButtonGroup {...defaultProps} {...args} value={value} onChange={v => setValue(v)} />
      </div>
    );
  },
};

export default meta;
