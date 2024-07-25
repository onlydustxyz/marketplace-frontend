import type { Meta, StoryObj } from "@storybook/react";

import { Paper } from "components/atoms/paper";

import { SignupTemplate } from "./signup-template";
import { TSignupTemplate } from "./signup-template.types";

type Story = StoryObj<typeof SignupTemplate>;

const defaultProps: TSignupTemplate.Props = {
  children: (
    <>
      <Paper container="2" classNames={{ base: "h-10" }} />
    </>
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
