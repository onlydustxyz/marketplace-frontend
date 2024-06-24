import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "components/atoms/button/variants/button-default";

import { ModalCore } from "./modal.core";
import { ModalPort } from "./modal.types";
import { Modal } from "./variants/modal-default";

type Story = StoryObj<typeof ModalCore>;

const defaultProps: ModalPort = {
  isOpen: false,
  titleProps: { children: "Modal title" },
  footer: {
    startContent: "Footer start",
    endContent: "Footer end",
  },
  children: "Modal content",
  classNames: {},
};

const meta: Meta<typeof ModalCore> = {
  component: ModalCore,
  title: "Molecules/Modal",
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
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open modal</Button>
        <Modal {...defaultProps} {...args} isOpen={isOpen} onOpenChange={setIsOpen} />
      </div>
    );
  },
};

export default meta;
