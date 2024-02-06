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
        <Banner {...defaultProps} {...args} variant="rainbow" size="medium" />
        <Banner {...defaultProps} {...args} variant="orange" size="medium" />
        <Banner {...defaultProps} {...args} variant="red" size="medium" />
        <Banner {...defaultProps} {...args} variant="heavy" size="medium" />
        <Banner {...defaultProps} {...args} variant="medium" size="medium" />
        <Banner {...defaultProps} {...args} variant="light" size="medium" />
      </div>
    );
  },
};

export const Rainbow: Story = {
  render: args => {
    return (
      <div className="flex w-full flex-col gap-2">
        <Banner {...defaultProps} {...args} variant="rainbow" size="big" />
        <Banner {...defaultProps} {...args} variant="rainbow" size="medium" />
        <Banner {...defaultProps} {...args} variant="rainbow" size="small" />
      </div>
    );
  },
};
export const Orange: Story = {
  render: args => {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="orange" size="big" />
          <Banner {...defaultProps} {...args} variant="orange" size="medium" />
          <Banner {...defaultProps} {...args} variant="orange" size="small" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="orange" size="big" hasBorder />
          <Banner {...defaultProps} {...args} variant="orange" size="medium" hasBorder />
          <Banner {...defaultProps} {...args} variant="orange" size="small" hasBorder />
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
          <Banner {...defaultProps} {...args} variant="red" size="big" />
          <Banner {...defaultProps} {...args} variant="red" size="medium" />
          <Banner {...defaultProps} {...args} variant="red" size="small" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="red" size="big" hasBorder />
          <Banner {...defaultProps} {...args} variant="red" size="medium" hasBorder />
          <Banner {...defaultProps} {...args} variant="red" size="small" hasBorder />
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
          <Banner {...defaultProps} {...args} variant="heavy" size="big" />
          <Banner {...defaultProps} {...args} variant="heavy" size="medium" />
          <Banner {...defaultProps} {...args} variant="heavy" size="small" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="heavy" size="big" hasBorder />
          <Banner {...defaultProps} {...args} variant="heavy" size="medium" hasBorder />
          <Banner {...defaultProps} {...args} variant="heavy" size="small" hasBorder />
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
          <Banner {...defaultProps} {...args} variant="medium" size="big" />
          <Banner {...defaultProps} {...args} variant="medium" size="medium" />
          <Banner {...defaultProps} {...args} variant="medium" size="small" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="medium" size="big" hasBorder />
          <Banner {...defaultProps} {...args} variant="medium" size="medium" hasBorder />
          <Banner {...defaultProps} {...args} variant="medium" size="small" hasBorder />
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
          <Banner {...defaultProps} {...args} variant="light" size="big" />
          <Banner {...defaultProps} {...args} variant="light" size="medium" />
          <Banner {...defaultProps} {...args} variant="light" size="small" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Banner {...defaultProps} {...args} variant="light" size="big" hasBorder />
          <Banner {...defaultProps} {...args} variant="light" size="medium" hasBorder />
          <Banner {...defaultProps} {...args} variant="light" size="small" hasBorder />
        </div>
      </div>
    );
  },
};

export default meta;
