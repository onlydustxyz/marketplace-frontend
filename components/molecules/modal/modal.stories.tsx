import { Meta, StoryObj } from "@storybook/react";

import { ModalCore } from "./modal.core";
import { TModalProps } from "./modal.types";
import { Modal } from "./variants/modal-default";

type Story = StoryObj<typeof ModalCore>;

const defaultProps: TModalProps = {
  title: "v2.pages.home.recommendedProjects.title",
  footerStartContent: "Footer start",
  footerEndContent: "Footer end",
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
    return (
      <div className="flex w-full items-center gap-2">
        <Modal {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Core: Story = {
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <ModalCore {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
