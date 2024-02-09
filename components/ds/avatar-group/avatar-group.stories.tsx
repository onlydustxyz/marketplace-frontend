import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import { AvatarGroup } from "./avatar-group";

type Story = StoryObj<typeof AvatarGroup>;

const defaultProps: ComponentProps<typeof AvatarGroup> = {
  avatars: [{ src: "" }, { src: "" }, { src: "" }],
};

const meta: Meta<typeof AvatarGroup> = {
  component: AvatarGroup,
  title: "Design system/AvatarGroup",
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
        <AvatarGroup {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
