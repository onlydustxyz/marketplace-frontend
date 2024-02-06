import { Meta, StoryObj } from "@storybook/react";

import { Banner } from "./banner";
import { TBanner } from "./banner.types";

type Story = StoryObj<typeof Banner>;

const defaultProps: TBanner.Props = {
  title: "Banner title",
  description: "Banner description",
  icon: { remixName: "ri-user-3-line" },
  button: { children: "Button" },
};

const meta: Meta<typeof Banner> = {
  component: Banner,
  title: "Design system/Banner",
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
      <div className="flex w-full flex-col gap-2">
        <Banner {...defaultProps} {...args} variant="rainbow" size="m" />
        <Banner {...defaultProps} {...args} variant="orange" size="m" />
        <Banner {...defaultProps} {...args} variant="red" size="m" />
        <Banner {...defaultProps} {...args} variant="heavy" size="m" />
        <Banner {...defaultProps} {...args} variant="medium" size="m" />
        <Banner {...defaultProps} {...args} variant="light" size="m" />
      </div>
    );
  },
};

export const Rainbow: Story = {
  render: args => {
    return (
      <div className="flex w-full flex-col gap-2">
        <Banner {...defaultProps} {...args} variant="rainbow" size="l" />
        <Banner {...defaultProps} {...args} variant="rainbow" size="m" />
        <Banner {...defaultProps} {...args} variant="rainbow" size="s" />
      </div>
    );
  },
};
export const Orange: Story = {
  render: args => {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="orange" size="l" />
          <Banner {...defaultProps} {...args} variant="orange" size="m" />
          <Banner {...defaultProps} {...args} variant="orange" size="s" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="orange" size="l" hasBorder />
          <Banner {...defaultProps} {...args} variant="orange" size="m" hasBorder />
          <Banner {...defaultProps} {...args} variant="orange" size="s" hasBorder />
        </div>
      </div>
    );
  },
};

export const Red: Story = {
  render: args => {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="red" size="l" />
          <Banner {...defaultProps} {...args} variant="red" size="m" />
          <Banner {...defaultProps} {...args} variant="red" size="s" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="red" size="l" hasBorder />
          <Banner {...defaultProps} {...args} variant="red" size="m" hasBorder />
          <Banner {...defaultProps} {...args} variant="red" size="s" hasBorder />
        </div>
      </div>
    );
  },
};

export const Heavy: Story = {
  render: args => {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="heavy" size="l" />
          <Banner {...defaultProps} {...args} variant="heavy" size="m" />
          <Banner {...defaultProps} {...args} variant="heavy" size="s" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="heavy" size="l" hasBorder />
          <Banner {...defaultProps} {...args} variant="heavy" size="m" hasBorder />
          <Banner {...defaultProps} {...args} variant="heavy" size="s" hasBorder />
        </div>
      </div>
    );
  },
};

export const Medium: Story = {
  render: args => {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="medium" size="l" />
          <Banner {...defaultProps} {...args} variant="medium" size="m" />
          <Banner {...defaultProps} {...args} variant="medium" size="s" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="medium" size="l" hasBorder />
          <Banner {...defaultProps} {...args} variant="medium" size="m" hasBorder />
          <Banner {...defaultProps} {...args} variant="medium" size="s" hasBorder />
        </div>
      </div>
    );
  },
};
export const Light: Story = {
  render: args => {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="light" size="l" />
          <Banner {...defaultProps} {...args} variant="light" size="m" />
          <Banner {...defaultProps} {...args} variant="light" size="s" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="light" size="l" hasBorder />
          <Banner {...defaultProps} {...args} variant="light" size="m" hasBorder />
          <Banner {...defaultProps} {...args} variant="light" size="s" hasBorder />
        </div>
      </div>
    );
  },
};

export default meta;
