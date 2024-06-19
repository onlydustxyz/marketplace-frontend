import { Meta, StoryObj } from "@storybook/react";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { Icon } from "components/layout/icon/icon";

import { DrawerPort } from "./drawer.types";
import { Drawer } from "./variants/drawer-default";

type Story = StoryObj<typeof Drawer>;

const defaultProps: DrawerPort<"div"> = {
  trigger: <Button>Open Drawer</Button>,
  children: "MODAL CONTENT",
  header: {
    leftContainer: <Typo size={"l"}>Header</Typo>,
    rightContainer: <Icon remixName={"ri-square-line"} size={16} />,
  },
  footer: {
    leftContainer: <Icon remixName={"ri-square-line"} size={16} />,
    rightContainer: <Icon remixName={"ri-square-line"} size={16} />,
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
    leftContainer: <div />,
    rightContainer: <div />
  }}
  header={{
    leftContainer: <div />,
    rightContainer: <div />
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
    return (
      <div className="flex w-full items-center gap-2">
        <Drawer {...defaultProps} {...args}>
          {defaultProps.children}
        </Drawer>
      </div>
    );
  },
};

export default meta;
