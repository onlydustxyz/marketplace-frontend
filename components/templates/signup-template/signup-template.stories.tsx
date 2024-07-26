import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";

import { SignupTemplate } from "./signup-template";
import { TSignupTemplate } from "./signup-template.types";

type Story = StoryObj<typeof SignupTemplate>;

const defaultProps: TSignupTemplate.Props = {
  children: (
    <div className={"flex flex-col gap-3"}>
      <Paper container="2" classNames={{ base: "h-10" }} />
      <Paper container="2" classNames={{ base: "h-56" }} />
      <Paper container="2" classNames={{ base: "h-32" }} />
      <Paper container="2" classNames={{ base: "h-[900px]" }} />
    </div>
  ),
  header: (
    <div className="flex w-full flex-row justify-between gap-1">
      <p className="text-2xl font-bold">Login</p>
      <Button variant={"secondary-light"}>Close</Button>
    </div>
  ),
  footer: (
    <div className="flex w-full flex-row justify-end gap-2">
      <Button variant={"secondary-light"}>Back</Button>
      <Button>Next</Button>
    </div>
  ),
};

const meta: Meta<typeof SignupTemplate> = {
  component: SignupTemplate,
  title: "Templates/SignupTemplate",
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
      <div className={"h-[897px] w-full"}>
        <SignupTemplate {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
