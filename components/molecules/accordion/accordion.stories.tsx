import { Meta, StoryObj } from "@storybook/react";

import { Icon } from "components/layout/icon/icon";

import { AccordionLoading } from "./accordion.loading";
import { AccordionPort, AccordionWithBadgePort } from "./accordion.types";
import { Accordion } from "./variants/accordion-default";
import { AccordionWithBadge } from "./variants/accordion-with-badge";

type Story = StoryObj<typeof Accordion>;

const defaultPort: AccordionPort = {
  items: [
    {
      id: "id-1",
      titleProps: { children: "Accordion 1" },
      content: "Accordion content 1",
    },
    {
      id: "id-2",
      titleProps: { children: "Accordion 2" },
      content: (
        <div className="flex flex-col gap-1">
          <p>Accordion content 1</p>
          <p>Accordion content 2</p>
        </div>
      ),
    },
  ],
};

const defaultPortWithBadge: AccordionWithBadgePort = {
  items: [
    {
      id: "id-1",
      titleProps: { children: "Accordion 1" },
      content: "Accordion content 1",
      badgeProps: { children: "1" },
    },
    {
      id: "id-2",
      titleProps: { children: "Accordion 2" },
      content: (
        <div className="flex flex-col gap-1">
          <p>Accordion content 1</p>
          <p>Accordion content 2</p>
        </div>
      ),
      badgeProps: { children: "2" },
    },
  ],
};

const defaultPortWithStartAndEndContent: AccordionPort = {
  items: [
    {
      id: "id-1",
      titleProps: { children: "Accordion 1" },
      content: "Accordion content 1",
      startContent: <Icon remixName="ri-square-line" />,
      endContent: <Icon remixName="ri-square-line" />,
    },
    {
      id: "id-2",
      titleProps: { children: "Accordion 2" },
      content: (
        <div className="flex flex-col gap-1">
          <p>Accordion content 1</p>
          <p>Accordion content 2</p>
        </div>
      ),
      startContent: <Icon remixName="ri-square-line" />,
      endContent: <Icon remixName="ri-square-line" />,
    },
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
      <div className="flex w-full flex-col items-center gap-8">
        <Accordion {...defaultPort} {...args} />
        <Accordion {...defaultPortWithStartAndEndContent} {...args} />
      </div>
    );
  },
};

export const WithBadge: Story = {
  parameters: {
    docs: {
      source: { code: "<AccordionWithBadge />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <AccordionWithBadge {...defaultPortWithBadge} {...args} />
      </div>
    );
  },
};

export const DefaultSelected: Story = {
  parameters: {
    docs: {
      source: { code: "<Accordion defaultSelected={['id-1']} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Accordion {...defaultPort} {...args} defaultSelected={["id-1"]} />
      </div>
    );
  },
};

export const Multiple: Story = {
  parameters: {
    docs: {
      source: { code: "<Accordion multiple />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Accordion {...defaultPort} {...args} multiple />
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
