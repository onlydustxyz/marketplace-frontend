import { Meta, StoryObj } from "@storybook/react";

import { DrawerCore } from "./drawer.core";
import { TDrawerProps } from "./drawer.types";
import { Drawer } from "./variants/drawer-default";

type Story = StoryObj<typeof DrawerCore>;

const defaultProps: TDrawerProps<"div"> = {};

const meta: Meta<typeof DrawerCore> = {
  component: DrawerCore,
  title: "Molecules/Drawer",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#1E1E1E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Drawer />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Drawer {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Core: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <DrawerCore {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
