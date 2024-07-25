import type { Meta, StoryObj } from "@storybook/react";

import { SignupAside } from "components/templates/signup-aside/signup-aside";
import { TSignupAside } from "components/templates/signup-aside/signup-aside.types";

type Story = StoryObj<typeof SignupAside>;

const defaultProps: TSignupAside.Props = {
  children: <div>SignupAside</div>,
};

const meta: Meta<typeof SignupAside> = {
  component: SignupAside,
  title: "Local components/SignupAside",
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
    return <SignupAside {...defaultProps} {...args} />;
  },
};

export default meta;
