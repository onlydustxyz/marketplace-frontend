import { Meta, StoryObj } from "@storybook/react";

import { AvatarLoading } from "components/atoms/avatar/avatar.loading";

import { AvatarPort } from "./avatar.types";
import { Avatar } from "./variants/avatar-default";

type Story = StoryObj<typeof Avatar>;

const defaultProps: AvatarPort = {
  name: "OD",
};

const sizes = ["xxl", "xl", "l", "ml", "m", "s", "xs"] as const;

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Atoms/Avatar",
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
      source: { code: "<Avatar />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Avatar {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Round: Story = {
  parameters: {
    docs: {
      source: { code: "<Avatar />" },
    },
  },
  render: () => {
    return (
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          {sizes.map(s => (
            <Avatar key={s} {...defaultProps} size={s} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          {sizes.map(s => (
            <Avatar key={s} {...defaultProps} size={s} container="brand" />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          {sizes.map(s => (
            <Avatar key={s} {...defaultProps} size={s} name={undefined} src={"a"} />
          ))}
        </div>
      </div>
    );
  },
};

export const Square: Story = {
  parameters: {
    docs: {
      source: { code: "<Avatar shape='square' />" },
    },
  },
  render: () => {
    return (
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          {sizes.map(s => (
            <Avatar key={s} {...defaultProps} shape="square" size={s} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          {sizes.map(s => (
            <Avatar key={s} {...defaultProps} shape="square" size={s} container="brand" />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          {sizes.map(s => (
            <Avatar key={s} {...defaultProps} shape="square" size={s} name={undefined} src={"a"} />
          ))}
        </div>
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarLoading  />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-start gap-4">
        <div className="flex flex-col items-center gap-2">
          {sizes.map(s => (
            <AvatarLoading key={s} size={s} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          {sizes.map(s => (
            <AvatarLoading key={s} size={s} shape={"square"} />
          ))}
        </div>
      </div>
    );
  },
};
export default meta;
