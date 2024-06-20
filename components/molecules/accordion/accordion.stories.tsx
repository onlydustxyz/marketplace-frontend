import { Meta, StoryObj } from "@storybook/react";

import { AccordionPort } from "./accordion.types";
import { Accordion } from "./variants/accordion-default";

type Story = StoryObj<typeof Accordion>;

const defaultPort: AccordionPort<"div"> = {};

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: "Molecules/Accordion",
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
      source: { code: "<Accordion />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Accordion {...defaultPort} {...args} />
      </div>
    );
  },
};

export default meta;
