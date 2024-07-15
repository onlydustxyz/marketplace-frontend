import { Meta, StoryObj } from "@storybook/react";

import { Button } from "components/atoms/button/variants/button-default";
import { Popover } from "components/atoms/popover/variants/popover-default";

type Story = StoryObj<typeof Popover>;

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: "Atoms/Popover",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Popover>
  <Popover.Trigger>
    {({ setIsOpen }) => (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open me</Button>
      </div>
    )}
  </Popover.Trigger>
  <Popover.Content>
    {({ setIsOpen }) => (
      <div className={"grid gap-2"}>
        <div>Sick popover🤘</div>
        <Button variant={"secondary-light"} size={"s"} onClick={() => setIsOpen(false)}>
          Close me
        </Button>
      </div>
    )}
  </Popover.Content>
</Popover>
      `,
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Popover {...args}>
          <Popover.Trigger>
            {({ setIsOpen }) => (
              <div>
                <Button onClick={() => setIsOpen(true)}>Open me</Button>
              </div>
            )}
          </Popover.Trigger>
          <Popover.Content>
            {({ setIsOpen }) => (
              <div className={"grid gap-2"}>
                <div>Sick popover🤘</div>
                <Button variant={"secondary-light"} size={"s"} onClick={() => setIsOpen(false)}>
                  Close me
                </Button>
              </div>
            )}
          </Popover.Content>
        </Popover>
      </div>
    );
  },
};

export default meta;
