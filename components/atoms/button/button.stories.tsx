import { Meta, StoryObj } from "@storybook/react";

import { ButtonLoading } from "components/atoms/button/button.loading";
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
        </div>
        <div className="flex flex-col gap-2">
          <Button {...defaultProps} {...args} />
        </div>
        <div className="flex flex-col gap-2">
          <Button {...defaultProps} {...args} size={"s"} />
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
          <ButtonPrimary {...defaultProps} {...args} size={"l"} isDisabled={true} />
          <ButtonPrimary {...defaultProps} {...args} size={"l"} isLoading={true} />
          <ButtonPrimary {...args} startIcon={{ remixName: "ri-square-line" }} display="icon" size={"l"} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonPrimary {...defaultProps} {...args} />
          <ButtonPrimary {...defaultProps} {...args} isDisabled={true} />
          <ButtonPrimary {...defaultProps} {...args} isLoading={true} />
          <ButtonPrimary {...args} startIcon={{ remixName: "ri-square-line" }} display="icon" />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonPrimary {...defaultProps} {...args} size={"s"} />
          <ButtonPrimary {...defaultProps} {...args} size={"s"} isDisabled={true} />
          <ButtonPrimary {...defaultProps} {...args} size={"s"} isLoading={true} />
          <ButtonPrimary {...args} startIcon={{ remixName: "ri-square-line" }} display="icon" size={"s"} />
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
          <ButtonSecondaryLight {...defaultProps} {...args} size={"l"} isDisabled={true} />
          <ButtonSecondaryLight {...defaultProps} {...args} size={"l"} isLoading={true} />
          <ButtonSecondaryLight {...args} startIcon={{ remixName: "ri-square-line" }} display="icon" size={"l"} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonSecondaryLight {...defaultProps} {...args} />
          <ButtonSecondaryLight {...defaultProps} {...args} isDisabled={true} />
          <ButtonSecondaryLight {...defaultProps} {...args} isLoading={true} />
          <ButtonSecondaryLight {...args} startIcon={{ remixName: "ri-square-line" }} display="icon" />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonSecondaryLight {...defaultProps} {...args} size={"s"} />
          <ButtonSecondaryLight {...defaultProps} {...args} size={"s"} isDisabled={true} />
          <ButtonSecondaryLight {...defaultProps} {...args} size={"s"} isLoading={true} />
          <ButtonSecondaryLight {...args} startIcon={{ remixName: "ri-square-line" }} display="icon" size={"s"} />
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
          <ButtonSecondaryDark {...defaultProps} {...args} size={"l"} isDisabled={true} />
          <ButtonSecondaryDark {...defaultProps} {...args} size={"l"} isLoading={true} />
          <ButtonSecondaryDark {...args} startIcon={{ remixName: "ri-square-line" }} display="icon" size={"l"} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonSecondaryDark {...defaultProps} {...args} />
          <ButtonSecondaryDark {...defaultProps} {...args} isDisabled={true} />
          <ButtonSecondaryDark {...defaultProps} {...args} isLoading={true} />
          <ButtonSecondaryDark {...args} startIcon={{ remixName: "ri-square-line" }} display="icon" />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonSecondaryDark {...defaultProps} {...args} size={"s"} />
          <ButtonSecondaryDark {...defaultProps} {...args} size={"s"} isDisabled={true} />
          <ButtonSecondaryDark {...defaultProps} {...args} size={"s"} isLoading={true} />
          <ButtonSecondaryDark {...args} startIcon={{ remixName: "ri-square-line" }} display="icon" size={"s"} />
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
          <ButtonDanger {...defaultProps} {...args} size={"l"} isDisabled={true} />
          <ButtonDanger {...defaultProps} {...args} size={"l"} isLoading={true} />
          <ButtonDanger {...args} startIcon={{ remixName: "ri-square-line" }} display="icon" size={"l"} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonDanger {...defaultProps} {...args} />
          <ButtonDanger {...defaultProps} {...args} isDisabled={true} />
          <ButtonDanger {...defaultProps} {...args} isLoading={true} />
          <ButtonDanger {...args} startIcon={{ remixName: "ri-square-line" }} display="icon" />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonDanger {...defaultProps} {...args} size={"s"} />
          <ButtonDanger {...defaultProps} {...args} size={"s"} isDisabled={true} />
          <ButtonDanger {...defaultProps} {...args} size={"s"} isLoading={true} />
          <ButtonDanger {...args} startIcon={{ remixName: "ri-square-line" }} display="icon" size={"s"} />
        </div>
      </div>
    );
  },
};
export const Skeleton: Story = {
  render: () => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <ButtonLoading size={"l"} />
          <ButtonLoading size={"l"} display={"icon"} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonLoading />
          <ButtonLoading display={"icon"} />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonLoading size={"s"} />
          <ButtonLoading size={"s"} display={"icon"} />
        </div>
      </div>
    );
  },
};

export default meta;
