import { Zdq } from "./variants/zdq-default";
import { ZdqCore } from "./zdq.core";
import { TZdqCore } from "./zdq.types";
import { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof ZdqCore>;

const defaultProps: TZdqCore.Props = {};

const meta: Meta<typeof ZdqCore> = {
  component: ZdqCore,
  title: "Molecules/Zdq",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
  },
};

export const Default: Story = {
  render: (args) => {
    return (
      <div className="flex w-full items-center gap-2">
        <Zdq {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Core: Story = {
  render: (args) => {
    return (
      <div className="flex w-full items-center gap-2">
        <ZdqCore {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
