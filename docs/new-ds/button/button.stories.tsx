import { Meta, StoryObj } from "@storybook/react";
import { TButtonCore } from "docs/new-ds/button/button.type";

import { ButtonCore } from "./button.core";
import { ButtonPrimary } from "./variants/button-primary";

type Story = StoryObj<typeof ButtonCore>;

const defaultProps: TButtonCore.Props = {
  text: "Default",
  onClick: () => null,
};

const meta: Meta<typeof ButtonCore> = {
  component: ButtonCore,
  title: "Atoms/Button",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
  },
};

export const Default: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <ButtonCore {...defaultProps} {...args}>
          Default
        </ButtonCore>
      </div>
    );
  },
};

export const Core: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <ButtonPrimary {...defaultProps} {...args}>
          Default
        </ButtonPrimary>
      </div>
    );
  },
};

export default meta;
