import { Meta, StoryObj } from "@storybook/react";

import { CardEventLoading } from "./card-event.loading";
import { CardEventPort } from "./card-event.types";
import { CardEvent } from "./variants/card-event-default";

type Story = StoryObj<typeof CardEvent>;

const defaultProps: CardEventPort<"div"> = {
  title: "Hylé & Stellar conference",
  titleIconProps: { remixName: "ri-live-line" },
  tagProps: { children: "Live", icon: { remixName: "ri-live-line" } },
  text: "You will get to meet project leads from Influence, Hylé and the Stellar projects!",
  primaryActionProps: { children: "Access to the live" },
  secondaryActionProps: { children: "Access to the live" },
};

const meta: Meta<typeof CardEvent> = {
  component: CardEvent,
  title: "Molecules/Cards/CardEvent",
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
      source: { code: "<CardEvent />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[330px] items-center gap-2">
        <CardEvent {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Planned: Story = {
  parameters: {
    docs: {
      source: { code: "<CardEvent status='planned' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[330px] items-center gap-2">
        <CardEvent {...defaultProps} {...args} status={"planned"} />
      </div>
    );
  },
};

export const Terminated: Story = {
  parameters: {
    docs: {
      source: { code: "<CardEvent status='terminated' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[330px] items-center gap-2">
        <CardEvent {...defaultProps} {...args} status={"terminated"} />
      </div>
    );
  },
};

export const Highlight: Story = {
  parameters: {
    docs: {
      source: { code: "<CardEvent status='highlight' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[330px] items-center gap-2">
        <CardEvent {...defaultProps} {...args} status={"highlight"} />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<CardEventLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[370px] items-center gap-2">
        <CardEventLoading />
      </div>
    );
  },
};

export default meta;
