import { Meta, StoryObj } from "@storybook/react";

import { TagAvatar } from "components/atoms/tag/variants/tag-avatar";
import { Icon } from "components/layout/icon/icon";

import { TagLoading } from "./tag.loading";
import { TagAvatarPort, TagIconPort, TagPort } from "./tag.types";
import { Tag } from "./variants/tag-default";
import { TagIcon } from "./variants/tag-icon";

type Story = StoryObj<typeof Tag>;

const defaultProps: TagPort<"div"> = {
  children: "Tag",
  classNames: {},
  htmlProps: {},
  isDeletable: true,
  startContent: <Icon remixName="ri-square-line" size={16} className="text-inherit" />,
};

const defaultTagIconProps: TagIconPort<"div"> = {
  ...defaultProps,
  startContent: undefined,
  icon: { remixName: "ri-fire-line" },
};

const defaultTagAvatarProps: TagAvatarPort<"div"> = {
  ...defaultProps,
  startContent: undefined,
  avatar: { src: undefined },
};

const sizes = ["m", "s", "xs"] as const;
const display = ["round", "square"] as const;
const style = ["fill", "outline"] as const;
const colors = ["black", "white", "red", "pink", "grey", "green", "yellow", "orange", "purple", "blue"] as const;

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: "Atoms/Tag",
  tags: ["autodocs"],
  parameters: {
    docs: {
      source: { language: "tsx" },
    },
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#1E1E1E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Tag>Label</Tag>" },
    },
  },
  render: args => {
    return <Tag {...defaultProps} {...args} />;
  },
};

export const Rounded: Story = {
  parameters: {
    docs: {
      source: { code: "<Tag shape'rounded' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-8">
          {sizes.map(s => {
            return (
              <div key={s} className="flex flex-col items-start gap-2">
                <Tag {...defaultProps} {...args} size={s} shape="round" />
                <Tag {...defaultProps} {...args} size={s} shape="round" hideText />
                <Tag {...defaultProps} {...args} size={s} shape="round" hideText isDeletable={false} />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

export const Square: Story = {
  parameters: {
    docs: {
      source: { code: "<Tag shape'square' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-8">
          {sizes.map(s => {
            return (
              <div key={s} className="flex flex-col items-start gap-2">
                <Tag {...defaultProps} {...args} size={s} shape="square" />
                <Tag {...defaultProps} {...args} size={s} shape="square" hideText />
                <Tag {...defaultProps} {...args} size={s} shape="square" hideText isDeletable={false} />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      source: { code: "<TagIcon icon={{ remixName: 'ri-fire-line' }} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-2">
          {display.map(d => {
            return (
              <div key={d} className="flex w-full items-start gap-8">
                {sizes.map(s => {
                  return (
                    <div key={s} className="flex flex-col items-start gap-2">
                      <TagIcon {...defaultTagIconProps} {...args} size={s} shape={d} />
                      <TagIcon {...defaultTagIconProps} {...args} size={s} shape={d} hideText />
                      <TagIcon {...defaultTagIconProps} {...args} size={s} shape={d} hideText isDeletable={false} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};
export const WithAvatar: Story = {
  parameters: {
    docs: {
      source: { code: "<TagAvatar avatar={{ }} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-2">
          {display.map(d => {
            return (
              <div key={d} className="flex w-full items-start gap-8">
                {sizes.map(s => {
                  return (
                    <div key={s} className="flex flex-col items-start gap-2">
                      <TagAvatar {...defaultTagAvatarProps} {...args} size={s} shape={d} />
                      <TagAvatar {...defaultTagAvatarProps} {...args} size={s} shape={d} hideText />
                      <TagAvatar {...defaultTagAvatarProps} {...args} size={s} shape={d} hideText isDeletable={false} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

export const HasDropdown: Story = {
  parameters: {
    docs: {
      source: { code: "<TagAvatar hasDropdown={true} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-2">
          {display.map(d => {
            return (
              <div key={d} className="flex w-full items-start gap-8">
                {sizes.map(s => {
                  return (
                    <div key={s} className="flex flex-col items-start gap-2">
                      <Tag {...defaultTagIconProps} {...args} hasDropdown={true} size={s} shape={d} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

export const Colors: Story = {
  parameters: {
    docs: {
      source: { code: "<Tag color='blue' style='fill' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        {colors.map(c => {
          return (
            <div key={c} className="flex w-full items-center gap-2">
              {style.map(s => {
                return <Tag key={`${c}-${s}`} {...defaultProps} {...args} color={c} style={s} />;
              })}
            </div>
          );
        })}
      </div>
    );
  },
};

export const Clickable: Story = {
  parameters: {
    docs: {
      source: { code: "<Tag clickable={true} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        {colors.map(c => {
          return (
            <div key={c} className="flex w-full items-center gap-2">
              {style.map(s => {
                return <Tag key={`${c}-${s}`} {...defaultProps} {...args} clickable={true} color={c} style={s} />;
              })}
            </div>
          );
        })}
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<TagLoading  />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <TagLoading size={"m"} />
          <TagLoading size={"m"} shape={"square"} />
          <TagLoading size={"m"} hideText />
          <TagLoading size={"m"} hideText shape={"square"} />
        </div>
        <div className="flex flex-col gap-2">
          <TagLoading size={"s"} />
          <TagLoading size={"s"} shape={"square"} />
          <TagLoading size={"s"} hideText />
          <TagLoading size={"s"} hideText shape={"square"} />
        </div>
        <div className="flex flex-col gap-2">
          <TagLoading size={"xs"} />
          <TagLoading size={"xs"} shape={"square"} />
          <TagLoading size={"xs"} hideText />
          <TagLoading size={"xs"} hideText shape={"square"} />
        </div>
      </div>
    );
  },
};

export default meta;
