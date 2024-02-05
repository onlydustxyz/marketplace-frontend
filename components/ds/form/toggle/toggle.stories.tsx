import type { Meta, StoryObj } from "@storybook/react";

import StoryState from "components/features/storybooks/stateManagement";

import { Toggle } from "./toggle";
import { TToggle } from "./toggle.types";

type Story = StoryObj<typeof Toggle>;

const defaultProps: TToggle.Props = {
  ariaLabel: "aria label",
  value: false,
  onChange: () => null,
};

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: "Design system/Form/Toggle",
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
      <StoryState initial="value1">
        {(state, setState) => (
          <div className="flex flex-row items-center justify-start gap-2">
            <Toggle {...defaultProps} {...args} value={state} onChange={(value: boolean) => setState(value)} />
            <Toggle
              {...defaultProps}
              {...args}
              value={state}
              onChange={(value: boolean) => setState(value)}
              disabled={true}
            />
          </div>
        )}
      </StoryState>
    );
  },
};

export default meta;
