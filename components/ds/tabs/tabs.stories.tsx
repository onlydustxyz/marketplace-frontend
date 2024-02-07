import { Meta, StoryObj } from "@storybook/react";

import StoryState from "components/features/storybooks/stateManagement";

import { Tabs } from "./tabs";
import { TTabs } from "./tabs.types";

type Story = StoryObj<typeof Tabs>;

const defaultProps: TTabs.Props = {
  tabs: [
    {
      content: "Tab 1",
      key: "tab1",
      icon: { remixName: "ri-check-line" },
    },
    {
      content: "Tab 2",
      key: "tab2",
      icon: { remixName: "ri-close-line" },
    },
  ],
};

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: "Design system/Tabs",
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
      <StoryState initial="tab1">
        {(state, setState) => (
          <Tabs {...defaultProps} {...args} controlled={{ selected: state, onSelect: key => setState(key) }} />
        )}
      </StoryState>
    );
  },
};
export const Blue: Story = {
  render: args => {
    return (
      <StoryState initial="tab1">
        {(state, setState) => (
          <Tabs
            color="blue"
            {...defaultProps}
            {...args}
            controlled={{ selected: state, onSelect: key => setState(key) }}
          />
        )}
      </StoryState>
    );
  },
};

export const Grey: Story = {
  render: args => {
    return (
      <StoryState initial="tab1">
        {(state, setState) => (
          <Tabs
            color="grey"
            {...defaultProps}
            {...args}
            controlled={{ selected: state, onSelect: key => setState(key) }}
          />
        )}
      </StoryState>
    );
  },
};

export default meta;
