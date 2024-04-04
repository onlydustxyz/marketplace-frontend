import type { Meta, StoryObj } from "@storybook/react";

import StoryState from "components/features/storybooks/stateManagement";

import { RadioGroup } from "./radio-group";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: "Design system/Form/RadioGroup",
  tags: ["autodocs"],
  parameters: {
    height: 500,
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
    docs: { iframeHeight: 600 },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => {
    return (
      <div className="h-80 w-80">
        <StoryState initial="value1">
          {(state, setState) => (
            <RadioGroup onChange={value => setState(value)} value={state}>
              <RadioGroup.Item value="value1">
                {({ isSelected }) => <div>{`selected : ${isSelected}`}</div>}
              </RadioGroup.Item>
              <RadioGroup.Item value="value2">
                {({ isSelected }) => <div>{`selected : ${isSelected}`}</div>}
              </RadioGroup.Item>
            </RadioGroup>
          )}
        </StoryState>
      </div>
    );
  },
};
