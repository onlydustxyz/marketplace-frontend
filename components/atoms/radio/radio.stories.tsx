import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { RadioPort } from "./radio.types";
import { Radio } from "./variants/radio-default";

type Story = StoryObj<typeof Radio>;

const defaultProps: RadioPort<string, "div"> = {
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

const DefaultSingleProps: RadioPort<string, "div"> = {
  value: "",
  items: [
    {
      value: "Option 1",
    },
  ],
};

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: "Atoms/Radio",
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
        <Radio {...defaultProps} {...args} value={value} onChange={v => setValue(v)} />
      </div>
    );
  },
};

export const White: Story = {
  parameters: {
    docs: {
      source: { code: "<Radio color='white' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Radio {...DefaultSingleProps} {...args} color={"white"} />
        <Radio {...DefaultSingleProps} {...args} color={"white"} value={"Option 1"} />
        <Radio {...DefaultSingleProps} {...args} color={"white"} value={"Option 1"} mixed={true} />
        <Radio {...DefaultSingleProps} {...args} color={"white"} isDisabled={true} />
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
      source: { code: "<Radio color='black' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Radio {...DefaultSingleProps} {...args} color={"black"} />
        <Radio {...DefaultSingleProps} {...args} color={"black"} value={"Option 1"} />
        <Radio {...DefaultSingleProps} {...args} color={"black"} value={"Option 1"} mixed={true} />
        <Radio {...DefaultSingleProps} {...args} color={"black"} isDisabled={true} />
      </div>
    );
  },
};

export default meta;
