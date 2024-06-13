import { Meta, StoryObj } from "@storybook/react";

import { ButtonDanger } from "components/atoms/button/variants/button-danger";
import { ButtonPrimary } from "components/atoms/button/variants/button-primary";
import { Icon } from "components/layout/icon/icon";

import { ButtonCore } from "./button.core";
import { TButtonProps } from "./button.types";

type Story = StoryObj<typeof ButtonCore>;

const defaultProps: TButtonProps<"button"> = {
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
      </div>
    );
  },
};

export const Primary: Story = {
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#1E2551" }],
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <ButtonPrimary {...defaultProps} {...args} size={"l"} />
          <ButtonPrimary {...defaultProps} {...args} size={"l"} state="disabled" />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonPrimary {...defaultProps} {...args} />
          <ButtonPrimary {...defaultProps} {...args} state="disabled" />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonPrimary {...defaultProps} {...args} size={"s"} />
          <ButtonPrimary {...defaultProps} {...args} size={"s"} state="disabled" />
        </div>
      </div>
    );
  },
};

export const Danger: Story = {
  render: args => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <ButtonDanger {...defaultProps} {...args} size={"l"} />
          <ButtonDanger {...defaultProps} {...args} size={"l"} state="disabled" />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonDanger {...defaultProps} {...args} />
          <ButtonDanger {...defaultProps} {...args} state="disabled" />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonDanger {...defaultProps} {...args} size={"s"} />
          <ButtonDanger {...defaultProps} {...args} size={"s"} state="disabled" />
        </div>
      </div>
    );
  },
};

export default meta;
