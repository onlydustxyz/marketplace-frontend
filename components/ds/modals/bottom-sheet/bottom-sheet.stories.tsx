import type { Meta, StoryObj } from "@storybook/react";

import { BottomSheet } from "./bottom-sheet";
import { TBottomSheet } from "./bottom-sheet.types";

type Story = StoryObj<typeof BottomSheet>;

const defaultProps: TBottomSheet.Props = {
  children: <div>BottomSheet</div>,
};

const meta: Meta<typeof BottomSheet> = {
  component: BottomSheet,
  title: "Design system/BottomSheet",
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
    return <BottomSheet {...defaultProps} {...args} />;
  },
};

export default meta;
