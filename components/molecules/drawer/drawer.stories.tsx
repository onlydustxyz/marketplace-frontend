import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { Icon } from "components/layout/icon/icon";

import { DrawerPort } from "./drawer.types";
import { Drawer } from "./variants/drawer-default";

type Story = StoryObj<typeof Drawer>;

const defaultProps: DrawerPort<"div"> = {
  children: "MODAL CONTENT",

  header: {
    startContent: <Typo size={"l"}>Header</Typo>,
    endContent: <Icon remixName={"ri-square-line"} size={16} />,
  },
  footer: {
    startContent: <Icon remixName={"ri-square-line"} size={16} />,
    endContent: <Icon remixName={"ri-square-line"} size={16} />,
  },
};

const meta: Meta<typeof Drawer> = {
  component: Drawer,
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
      source: {
        code: `
<Drawer
  footer={{
    startContent: <div />,
    endContent: <div />
  }}
  header={{
    startContent: <div />,
    endContent: <div />
  }}
  trigger={<Button>Open Drawer</Button>}
>
  MODAL CONTENT
</Drawer>
      `,
      },
    },
  },
  render: args => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex w-full items-center gap-2">
        <Button onClick={() => setIsOpen(true)}>Open modal</Button>
        <Drawer {...defaultProps} {...args} isOpen={isOpen} onOpenChange={setIsOpen}>
          {defaultProps.children}
        </Drawer>
      </div>
    );
  },
};

export default meta;
