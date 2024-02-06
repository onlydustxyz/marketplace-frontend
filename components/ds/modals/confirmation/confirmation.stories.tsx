import type { Meta, StoryObj } from "@storybook/react";

import Button from "src/components/Button";

import StoryState from "components/features/storybooks/stateManagement";

import { ConfirmationModal } from "./confirmation";
import { TConfirmationModal } from "./confirmation.types";

type Story = StoryObj<typeof ConfirmationModal>;

const defaultProps: TConfirmationModal.Props = {
  content: "Content",
  title: "Title",
  onClose: () => null,
  buttons: {
    confirm: {
      children: "confirm",
    },
    cancel: {
      children: "cancel",
    },
  },
};

const meta: Meta<typeof ConfirmationModal> = {
  component: ConfirmationModal,
  title: "Design system/Modals/Confirmation",
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
            <Button onClick={() => setState(true)}>Open confirmation</Button>
            <ConfirmationModal open={state} {...args} {...defaultProps} onClose={() => setState(false)} />
          </div>
        )}
      </StoryState>
    );
  },
};

export default meta;
