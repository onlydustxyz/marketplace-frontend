import { Meta, StoryObj } from "@storybook/react";

import { ButtonLoading } from "components/atoms/button/button.loading";
import { Icon } from "components/layout/icon/icon";

import { ButtonPort } from "./button.types";
import { Button } from "./variants/button-default";

type Story = StoryObj<typeof Button>;

const defaultProps: ButtonPort<"button"> = {
  children: "Button core",
  startIcon: { remixName: "ri-square-line" },
  endIcon: { remixName: "ri-square-line" },
  startContent: <Icon remixName={"ri-square-line"} size={16} className="text-inherit" />,
  endContent: <Icon remixName={"ri-square-line"} size={16} className="text-inherit" />,
};

const meta: Meta<typeof Button> = {
  component: Button,
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
    return <Button {...defaultProps} endContent={undefined} startContent={undefined} endIcon={undefined} {...args} />;
  },
};

export const Size: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Button
  startIcon={{
    remixName: 'ri-square-line'
  }}
>
  Button core
</Button>
        `,
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <Button {...defaultProps} {...args} size={"xl"} />
        </div>
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
    docs: {
      source: { code: "<Button variant='primary' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <Button variant={"primary"} {...defaultProps} {...args} size={"xl"} />
          <Button variant={"primary"} {...defaultProps} {...args} size={"xl"} isDisabled={true} />
          <Button variant={"primary"} {...defaultProps} {...args} size={"xl"} isLoading={true} />
          <Button variant={"primary"} {...args} startIcon={{ remixName: "ri-square-line" }} hideText size={"xl"} />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"primary"} {...defaultProps} {...args} size={"l"} />
          <Button variant={"primary"} {...defaultProps} {...args} size={"l"} isDisabled={true} />
          <Button variant={"primary"} {...defaultProps} {...args} size={"l"} isLoading={true} />
          <Button variant={"primary"} {...args} startIcon={{ remixName: "ri-square-line" }} hideText size={"l"} />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"primary"} {...defaultProps} {...args} />
          <Button variant={"primary"} {...defaultProps} {...args} isDisabled={true} />
          <Button variant={"primary"} {...defaultProps} {...args} isLoading={true} />
          <Button variant={"primary"} {...args} startIcon={{ remixName: "ri-square-line" }} hideText />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"primary"} {...defaultProps} {...args} size={"s"} />
          <Button variant={"primary"} {...defaultProps} {...args} size={"s"} isDisabled={true} />
          <Button variant={"primary"} {...defaultProps} {...args} size={"s"} isLoading={true} />
          <Button variant={"primary"} {...args} startIcon={{ remixName: "ri-square-line" }} hideText size={"s"} />
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
    docs: {
      source: { code: "<Button variant='secondary-light' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <Button variant={"secondary-light"} {...defaultProps} {...args} size={"xl"} />
          <Button variant={"secondary-light"} {...defaultProps} {...args} size={"xl"} isDisabled={true} />
          <Button variant={"secondary-light"} {...defaultProps} {...args} size={"xl"} isLoading={true} />
          <Button
            variant={"secondary-light"}
            {...args}
            startIcon={{ remixName: "ri-square-line" }}
            hideText
            size={"xl"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"secondary-light"} {...defaultProps} {...args} size={"l"} />
          <Button variant={"secondary-light"} {...defaultProps} {...args} size={"l"} isDisabled={true} />
          <Button variant={"secondary-light"} {...defaultProps} {...args} size={"l"} isLoading={true} />
          <Button
            variant={"secondary-light"}
            {...args}
            startIcon={{ remixName: "ri-square-line" }}
            hideText
            size={"l"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"secondary-light"} {...defaultProps} {...args} />
          <Button variant={"secondary-light"} {...defaultProps} {...args} isDisabled={true} />
          <Button variant={"secondary-light"} {...defaultProps} {...args} isLoading={true} />
          <Button variant={"secondary-light"} {...args} startIcon={{ remixName: "ri-square-line" }} hideText />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"secondary-light"} {...defaultProps} {...args} size={"s"} />
          <Button variant={"secondary-light"} {...defaultProps} {...args} size={"s"} isDisabled={true} />
          <Button variant={"secondary-light"} {...defaultProps} {...args} size={"s"} isLoading={true} />
          <Button
            variant={"secondary-light"}
            {...args}
            startIcon={{ remixName: "ri-square-line" }}
            hideText
            size={"s"}
          />
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
    docs: {
      source: { code: "<Button variant='secondary-dark' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <Button variant={"secondary-dark"} {...defaultProps} {...args} size={"xl"} />
          <Button variant={"secondary-dark"} {...defaultProps} {...args} size={"xl"} isDisabled={true} />
          <Button variant={"secondary-dark"} {...defaultProps} {...args} size={"xl"} isLoading={true} />
          <Button
            variant={"secondary-dark"}
            {...args}
            startIcon={{ remixName: "ri-square-line" }}
            hideText
            size={"xl"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"secondary-dark"} {...defaultProps} {...args} size={"l"} />
          <Button variant={"secondary-dark"} {...defaultProps} {...args} size={"l"} isDisabled={true} />
          <Button variant={"secondary-dark"} {...defaultProps} {...args} size={"l"} isLoading={true} />
          <Button
            variant={"secondary-dark"}
            {...args}
            startIcon={{ remixName: "ri-square-line" }}
            hideText
            size={"l"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"secondary-dark"} {...defaultProps} {...args} />
          <Button variant={"secondary-dark"} {...defaultProps} {...args} isDisabled={true} />
          <Button variant={"secondary-dark"} {...defaultProps} {...args} isLoading={true} />
          <Button variant={"secondary-dark"} {...args} startIcon={{ remixName: "ri-square-line" }} hideText />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"secondary-dark"} {...defaultProps} {...args} size={"s"} />
          <Button variant={"secondary-dark"} {...defaultProps} {...args} size={"s"} isDisabled={true} />
          <Button variant={"secondary-dark"} {...defaultProps} {...args} size={"s"} isLoading={true} />
          <Button
            variant={"secondary-dark"}
            {...args}
            startIcon={{ remixName: "ri-square-line" }}
            hideText
            size={"s"}
          />
        </div>
      </div>
    );
  },
};

export const Danger: Story = {
  parameters: {
    docs: {
      source: { code: "<Button variant='danger' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <Button variant={"danger"} {...defaultProps} {...args} size={"xl"} />
          <Button variant={"danger"} {...defaultProps} {...args} size={"xl"} isDisabled={true} />
          <Button variant={"danger"} {...defaultProps} {...args} size={"xl"} isLoading={true} />
          <Button variant={"danger"} {...args} startIcon={{ remixName: "ri-square-line" }} hideText size={"xl"} />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"danger"} {...defaultProps} {...args} size={"l"} />
          <Button variant={"danger"} {...defaultProps} {...args} size={"l"} isDisabled={true} />
          <Button variant={"danger"} {...defaultProps} {...args} size={"l"} isLoading={true} />
          <Button variant={"danger"} {...args} startIcon={{ remixName: "ri-square-line" }} hideText size={"l"} />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"danger"} {...defaultProps} {...args} />
          <Button variant={"danger"} {...defaultProps} {...args} isDisabled={true} />
          <Button variant={"danger"} {...defaultProps} {...args} isLoading={true} />
          <Button variant={"danger"} {...args} startIcon={{ remixName: "ri-square-line" }} hideText />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"danger"} {...defaultProps} {...args} size={"s"} />
          <Button variant={"danger"} {...defaultProps} {...args} size={"s"} isDisabled={true} />
          <Button variant={"danger"} {...defaultProps} {...args} size={"s"} isLoading={true} />
          <Button variant={"danger"} {...args} startIcon={{ remixName: "ri-square-line" }} hideText size={"s"} />
        </div>
      </div>
    );
  },
};
export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<ButtonLoading  />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <ButtonLoading size={"xl"} />
          <ButtonLoading size={"xl"} hideText />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonLoading size={"l"} />
          <ButtonLoading size={"l"} hideText />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonLoading />
          <ButtonLoading hideText />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonLoading size={"s"} />
          <ButtonLoading size={"s"} hideText />
        </div>
      </div>
    );
  },
};

export default meta;
