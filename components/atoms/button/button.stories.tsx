import { Meta, StoryObj } from "@storybook/react";

import { Icon } from "components/layout/icon/icon";

import { ButtonCore } from "./button.core";
import { TButtonProps } from "./button.types";
import { ButtonDanger } from "./variants/button-danger";
import { Button } from "./variants/button-default";
import { ButtonPrimary } from "./variants/button-primary";
import { ButtonSecondaryDark } from "./variants/button-secondary-dark";
import { ButtonSecondaryLight } from "./variants/button-secondary-light";

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
      values: [{ name: "black", value: "#05051E" }],
    },
  },
};

export const Default: Story = {
  render: args => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <Button {...defaultProps} {...args} size={"l"} />
          <Button {...defaultProps} {...args} size={"l"} state="disabled" />
          <Button {...defaultProps} {...args} size={"l"} isLoading={true} />
        </div>
        <div className="flex flex-col gap-2">
          <Button {...defaultProps} {...args} />
          <Button {...defaultProps} {...args} state="disabled" />
          <Button {...defaultProps} {...args} isLoading={true} />
        </div>
        <div className="flex flex-col gap-2">
          <Button {...defaultProps} {...args} size={"s"} />
          <Button {...defaultProps} {...args} size={"s"} state="disabled" />
          <Button {...defaultProps} {...args} size={"s"} isLoading={true} />
        </div>
      </div>
    );
  },
};

export const Primary: Story = {
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <ButtonPrimary {...defaultProps} {...args} size={"l"} />
          <ButtonPrimary {...defaultProps} {...args} size={"l"} state="disabled" />
          <ButtonPrimary {...defaultProps} {...args} size={"l"} isLoading={true} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonPrimary {...defaultProps} {...args} />
          <ButtonPrimary {...defaultProps} {...args} state="disabled" />
          <ButtonPrimary {...defaultProps} {...args} isLoading={true} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonPrimary {...defaultProps} {...args} size={"s"} />
          <ButtonPrimary {...defaultProps} {...args} size={"s"} state="disabled" />
          <ButtonPrimary {...defaultProps} {...args} size={"s"} isLoading={true} />
        </div>
      </div>
    );
  },
};

export const SecondaryLight: Story = {
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <ButtonSecondaryLight {...defaultProps} {...args} size={"l"} />
          <ButtonSecondaryLight {...defaultProps} {...args} size={"l"} state="disabled" />
          <ButtonSecondaryLight {...defaultProps} {...args} size={"l"} isLoading={true} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonSecondaryLight {...defaultProps} {...args} />
          <ButtonSecondaryLight {...defaultProps} {...args} state="disabled" />
          <ButtonSecondaryLight {...defaultProps} {...args} isLoading={true} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonSecondaryLight {...defaultProps} {...args} size={"s"} />
          <ButtonSecondaryLight {...defaultProps} {...args} size={"s"} state="disabled" />
          <ButtonSecondaryLight {...defaultProps} {...args} size={"s"} isLoading={true} />
        </div>
      </div>
    );
  },
};
export const SecondaryDark: Story = {
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#FFFFFF" }],
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <ButtonSecondaryDark {...defaultProps} {...args} size={"l"} />
          <ButtonSecondaryDark {...defaultProps} {...args} size={"l"} state="disabled" />
          <ButtonSecondaryDark {...defaultProps} {...args} size={"l"} isLoading={true} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonSecondaryDark {...defaultProps} {...args} />
          <ButtonSecondaryDark {...defaultProps} {...args} state="disabled" />
          <ButtonSecondaryDark {...defaultProps} {...args} isLoading={true} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonSecondaryDark {...defaultProps} {...args} size={"s"} />
          <ButtonSecondaryDark {...defaultProps} {...args} size={"s"} state="disabled" />
          <ButtonSecondaryDark {...defaultProps} {...args} size={"s"} isLoading={true} />
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
          <ButtonDanger {...defaultProps} {...args} size={"l"} isLoading={true} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonDanger {...defaultProps} {...args} />
          <ButtonDanger {...defaultProps} {...args} state="disabled" />
          <ButtonDanger {...defaultProps} {...args} isLoading={true} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonDanger {...defaultProps} {...args} size={"s"} />
          <ButtonDanger {...defaultProps} {...args} size={"s"} state="disabled" />
          <ButtonDanger {...defaultProps} {...args} size={"s"} isLoading={true} />
        </div>
      </div>
    );
  },
};

export default meta;
