import { Meta, StoryObj } from "@storybook/react";

import Button from "src/components/Button";

import { Icon } from "components/layout/icon/icon";

import { Dropdown } from "./dropdown";

type Story = StoryObj<typeof Dropdown>;

const icon = <Icon remixName="ri-add-line" size={16} />;

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: "Design system/Dropdown",
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
      <div className="h-[500px]">
        <div>
          <Dropdown
            {...args}
            items={[
              { key: "1", children: "Menu 1" },
              { key: "2", children: "Menu 2", startContent: icon },
              { key: "3", children: "Menu 3", startContent: icon, showDivider: true },
              { key: "4", children: "Menu 4", startContent: icon, isError: true },
              { key: "4", children: "Menu 4", startContent: icon, isWarning: true },
            ]}
          >
            <Button>Open Menu</Button>
          </Dropdown>
        </div>
      </div>
    );
  },
};

export default meta;
