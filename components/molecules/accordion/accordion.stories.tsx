import { Meta, StoryObj } from "@storybook/react";

import { AccordionLoading } from "./accordion.loading";
import { AccordionPort } from "./accordion.types";
import { Accordion } from "./variants/accordion-default";

type Story = StoryObj<typeof Accordion>;

const defaultPort: AccordionPort = {
  items: [
    {
      id: "1",
      titleProps: { children: "Accordion 1" },
      content: ["Accordion content 1"],
    },
    { id: "2", titleProps: { children: "Accordion 2" }, content: ["Accordion content 1", "Accordion content 2"] },
  ],
};

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

export const Badge: Story = {
  parameters: {
    docs: {
      source: { code: "<Accordion showBadge />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Accordion {...defaultPort} {...args} showBadge />
      </div>
    );
  },
};

export const DefaultSelected: Story = {
  parameters: {
    docs: {
      source: { code: "<Accordion defaultSelected={['1']} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Accordion {...defaultPort} {...args} defaultSelected={["1"]} />
        <Accordion {...defaultPort} {...args} defaultSelected={["1", "2"]} />
      </div>
    );
  },
};

export const Multiple: Story = {
  parameters: {
    docs: {
      source: { code: "<Accordion selectionMode='multiple' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Accordion {...defaultPort} {...args} selectionMode="multiple" />
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<AccordionLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <AccordionLoading />
      </div>
    );
  },
};

export default meta;
