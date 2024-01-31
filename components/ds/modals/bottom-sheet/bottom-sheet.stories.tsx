import type { Meta, StoryObj } from "@storybook/react";

import Button from "src/components/Button";

import StoryState from "components/features/storybooks/stateManagement";

import { BottomSheet } from "./bottom-sheet";
import { TBottomSheet } from "./bottom-sheet.types";

type Story = StoryObj<typeof BottomSheet>;

const defaultProps: TBottomSheet.Props = {
  children: <div>BottomSheet</div>,
  title: "Bottom Sheet",
  onClose: () => null,
};

const meta: Meta<typeof BottomSheet> = {
  component: BottomSheet,
  title: "Design system/Modals/BottomSheet",
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
      <StoryState initial={false}>
        {(state, setState) => (
          <div>
            <Button onClick={() => setState(true)}>Open bottom sheet</Button>
            <BottomSheet {...defaultProps} {...args} open={state} onClose={() => setState(false)} />
          </div>
        )}
      </StoryState>
    );
  },
};

export default meta;
