import { Meta, StoryObj } from "@storybook/react";

import { Button } from "components/atoms/button/variants/button-default";

import { Toaster, toast } from "./variants/toaster-default";

type Story = StoryObj<typeof Toaster>;

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  title: "Atoms/Toaster",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
  decorators: [
    Story => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: '<Button onClick={() => toast.default("Awesome toaster")}>Open default</Button>' },
    },
  },
  render: () => {
    return <Button onClick={() => toast.default("Awesome toaster")}>Open default</Button>;
  },
};

export const Error: Story = {
  parameters: {
    docs: {
      source: { code: '<Button onClick={() => toast.error("Oops, something went wrong")}>Open error</Button>' },
    },
  },
  render: () => {
    return <Button onClick={() => toast.error("Oops, something went wrong")}>Open error</Button>;
  },
};

export default meta;
