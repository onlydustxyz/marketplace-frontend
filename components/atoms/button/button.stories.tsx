import { Meta, StoryObj } from "@storybook/react";

import { ButtonDanger } from "components/atoms/button/variants/button-danger";
import { ButtonPrimary } from "components/atoms/button/variants/button-primary";
import { Icon } from "components/layout/icon/icon";

import { ButtonCore } from "./button.core";
import { TButtonProps } from "./button.types";

type Story = StoryObj<typeof ButtonCore>;

const defaultProps: TButtonProps = {
  children: "Button core",
  startIcon: { remixName: "ri-square-line" },
  endIcon: { remixName: "ri-square-line" },
  startContent: <Icon remixName={"ri-square-line"} size={16} />,
  endContent: <Icon remixName={"ri-square-line"} size={16} />,
};

const meta: Meta<typeof ButtonCore> = {
  component: ButtonCore,
  title: "Atoms/Button",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#1E1E1E" }],
    },
  },
};

export const Default: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-5">
        <ButtonCore {...defaultProps} {...args} size={"l"} />
        <ButtonCore {...defaultProps} {...args} />
        <ButtonCore {...defaultProps} {...args} size={"s"} />
        <ButtonCore {...defaultProps} {...args} size={"s"} state={"disabled"} />
      </div>
    );
  },
};

export const Primary: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <ButtonPrimary {...defaultProps} {...args} />
        <ButtonPrimary {...defaultProps} {...args} state="disabled" />
      </div>
    );
  },
};

export const Danger: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <ButtonDanger {...defaultProps} {...args} />
        <ButtonDanger {...defaultProps} {...args} state="disabled" />
      </div>
    );
  },
};

export default meta;
