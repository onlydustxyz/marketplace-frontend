import { Meta, StoryObj } from "@storybook/react";

import { TagAvatar } from "components/atoms/tag/variants/tag-avatar";
import { Icon } from "components/layout/icon/icon";

import { TagCore } from "./tag.core";
import { TTagAvatarProps, TTagIconProps, TTagProps } from "./tag.types";
import { Tag } from "./variants/tag-default";
import { TagIcon } from "./variants/tag-icon";

type Story = StoryObj<typeof TagCore>;

const defaultProps: TTagProps<"div"> = {
  children: "Tag",
  classNames: {},
  htmlProps: {},
  isDeletable: true,
  startContent: <Icon remixName="ri-square-line" size={16} className="text-inherit" />,
};

const defaultTagIconProps: TTagIconProps<"div"> = {
  ...defaultProps,
  startContent: undefined,
  icon: { remixName: "ri-fire-line" },
};

const defaultTagAvatarProps: TTagAvatarProps<"div"> = {
  ...defaultProps,
  startContent: undefined,
  avatar: { src: undefined },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sizes = ["m", "s", "xs"] as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const display = ["rounded", "square"] as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const style = ["fill", "outline"] as any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const colors = ["black", "white", "red", "pink", "grey", "green", "yellow", "orange", "purple", "blue"] as any[];

const meta: Meta<typeof TagCore> = {
  component: TagCore,
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
      source: { code: "<Tag display='rounded' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-8">
          {sizes.map(s => {
            return (
              <div key={s} className="flex flex-col items-start gap-2">
                <Tag {...defaultProps} {...args} size={s} display="rounded" />
                <Tag {...defaultProps} {...args} size={s} display="rounded" hideText />
                <Tag {...defaultProps} {...args} size={s} display="rounded" hideText isDeletable={false} />
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
      source: { code: "<Tag display='square' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-8">
          {sizes.map(s => {
            return (
              <div key={s} className="flex flex-col items-start gap-2">
                <Tag {...defaultProps} {...args} size={s} display="square" />
                <Tag {...defaultProps} {...args} size={s} display="square" hideText />
                <Tag {...defaultProps} {...args} size={s} display="square" hideText isDeletable={false} />
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
                      <TagIcon {...defaultTagIconProps} {...args} size={s} display={d} />
                      <TagIcon {...defaultTagIconProps} {...args} size={s} display={d} hideText />
                      <TagIcon {...defaultTagIconProps} {...args} size={s} display={d} hideText isDeletable={false} />
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
                      <TagAvatar {...defaultTagAvatarProps} {...args} size={s} display={d} />
                      <TagAvatar {...defaultTagAvatarProps} {...args} size={s} display={d} hideText />
                      <TagAvatar
                        {...defaultTagAvatarProps}
                        {...args}
                        size={s}
                        display={d}
                        hideText
                        isDeletable={false}
                      />
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

export default meta;
