import { Meta, StoryObj } from "@storybook/react";

import { AvatarGroupPort } from "./avatar-group.types";
import { AvatarGroup } from "./variants/avatar-group-default";

type Story = StoryObj<typeof AvatarGroup>;

const defaultAvatars: AvatarGroupPort<"div"> = {
  avatars: [
    { name: "Avatar 1" },
    { name: "Avatar 2" },
    { name: "Avatar 3" },
    { name: "Avatar 4" },
    { name: "Avatar 5" },
  ],
};

const avatarsWithSrc: AvatarGroupPort<"div"> = {
  ...defaultAvatars,
  avatars: [
    { src: "", name: undefined },
    { src: "", name: undefined },
    { src: "", name: undefined },
    { src: "", name: undefined },
    { src: "", name: undefined },
  ],
};

const sizes = ["xxl", "xl", "l", "ml", "m", "s", "xs"] as const;

const meta: Meta<typeof AvatarGroup> = {
  component: AvatarGroup,
  title: "Molecules/AvatarGroup",
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
      source: { code: "<AvatarGroup />" },
    },
  },
  render: args => (
    <div className="flex w-full items-center gap-2">
      <AvatarGroup {...defaultAvatars} {...args} />
    </div>
  ),
};

export const LimitedAvatars: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarGroup maxAvatars={3} />" },
    },
  },
  render: args => (
    <div className="flex w-full items-center gap-2">
      <div className="flex flex-col gap-2">
        {sizes.map(size => (
          <AvatarGroup key={size} {...defaultAvatars} {...args} size={size} maxAvatars={3} />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {sizes.map(size => (
          <AvatarGroup key={size} {...defaultAvatars} {...args} size={size} maxAvatars={3} container="brand" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {sizes.map(size => (
          <AvatarGroup key={size} {...avatarsWithSrc} {...args} size={size} maxAvatars={3} />
        ))}
      </div>
    </div>
  ),
};

export const Square: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarGroup shape='square' />" },
    },
  },
  render: args => (
    <div className="flex w-full items-center gap-2">
      <div className="flex flex-col gap-2">
        {sizes.map(size => (
          <AvatarGroup key={size} {...defaultAvatars} {...args} size={size} shape="square" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {sizes.map(size => (
          <AvatarGroup key={size} {...defaultAvatars} {...args} size={size} shape="square" container="brand" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {sizes.map(size => (
          <AvatarGroup key={size} {...avatarsWithSrc} {...args} size={size} shape="square" />
        ))}
      </div>
    </div>
  ),
};

export default meta;
