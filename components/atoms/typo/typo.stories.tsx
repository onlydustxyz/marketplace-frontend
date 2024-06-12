import { Meta, StoryObj } from "@storybook/react";

import "../../../index.css";
import { TypoCore } from "./typo.core";
import { TTypoProps } from "./typo.types";
import { Typo } from "./variants/typo-default";

type Story = StoryObj<typeof TypoCore>;

const defaultProps: TTypoProps = {
  children: "Lorem ipsum dollor",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sizes = ["xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"] as any[];

const meta: Meta<typeof TypoCore> = {
  component: TypoCore,
  title: "Atoms/Typo",
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
        {sizes.map(size => (
          <div key={size} className="flex w-full flex-row gap-2">
            <Typo size={size}>{size} - </Typo>
            <Typo {...defaultProps} {...args} size={size} />
          </div>
        ))}
      </div>
    );
  },
};

export const DefaultMedium: Story = {
  render: args => {
    return (
      <div className="flex w-full flex-col gap-2">
        {sizes.map(size => (
          <div key={size} className="flex w-full flex-row gap-2">
            <Typo size={size} weight="medium">
              {size} -{" "}
            </Typo>
            <Typo {...defaultProps} {...args} weight="medium" size={size} />
          </div>
        ))}
      </div>
    );
  },
};

export const Branding: Story = {
  render: args => {
    return (
      <div className="flex w-full flex-col gap-2">
        {sizes.map(size => (
          <div key={size} className="flex w-full flex-row gap-2">
            <Typo size={size} variant="branding">
              {size} -{" "}
            </Typo>
            <Typo {...defaultProps} {...args} variant="branding" size={size} />
          </div>
        ))}
      </div>
    );
  },
};

export default meta;
