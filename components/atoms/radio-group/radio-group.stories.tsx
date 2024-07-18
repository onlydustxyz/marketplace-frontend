import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { RadioGroupPort } from "./radio-group.types";
import { RadioGroup } from "./variants/radio-group-default";

type Story = StoryObj<typeof RadioGroup>;

const defaultProps: RadioGroupPort<string, "div"> = {
  value: "Option 1",
  items: [
    {
      value: "Option 1",
    },
    {
      value: "Option 2",
    },
  ],
};

const DefaultSingleProps: RadioGroupPort<string, "div"> = {
  value: "",
  items: [
    {
      value: "Option 1",
    },
  ],
};

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: "Atoms/RadioGroup",
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
      source: { code: "<Radio />" },
    },
  },
  render: args => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="flex w-full items-center gap-2">
        <RadioGroup {...defaultProps} {...args} value={value} onChange={v => setValue(v)} />
      </div>
    );
  },
};

export const White: Story = {
  parameters: {
    docs: {
      source: { code: "<RadioGroup color='white' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <RadioGroup {...DefaultSingleProps} {...args} color={"white"} />
        <RadioGroup {...DefaultSingleProps} {...args} color={"white"} value={"Option 1"} />
        <RadioGroup {...DefaultSingleProps} {...args} color={"white"} value={"Option 1"} mixed={true} />
        <RadioGroup {...DefaultSingleProps} {...args} color={"white"} isDisabled={true} />
      </div>
    );
  },
};

export const Black: Story = {
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#FFF" }],
    },
    docs: {
      source: { code: "<RadioGroup color='black' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <RadioGroup {...DefaultSingleProps} {...args} color={"black"} />
        <RadioGroup {...DefaultSingleProps} {...args} color={"black"} value={"Option 1"} />
        <RadioGroup {...DefaultSingleProps} {...args} color={"black"} value={"Option 1"} mixed={true} />
        <RadioGroup {...DefaultSingleProps} {...args} color={"black"} isDisabled={true} />
      </div>
    );
  },
};

export default meta;
