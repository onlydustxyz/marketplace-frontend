import { Confirmation } from "./confirmation";
import { TConfirmation } from "./confirmation.types";
import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof Confirmation>;

const defaultProps: TConfirmation.Props = {
  children: <div>Confirmation</div>,
};

const meta: Meta<typeof Confirmation> = {
  component: Confirmation,
  title: "Design system/Confirmation",
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
    return <Confirmation {...defaultProps} {...args} />;
  },
};

export default meta;
