import { Meta, StoryObj } from "@storybook/react";

import "../../../index.css";
import { TypoPort } from "./typo.types";
import { Typo } from "./variants/typo-default";

type Story = StoryObj<typeof Typo>;

const defaultProps: TypoPort<"span"> = {
  children: "Lorem ipsum dollor",
};

const sizes = ["xxs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"] as const;

const meta: Meta<typeof Typo> = {
  component: Typo,
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
  render: () => {
    return (
      <div className="flex w-full flex-col gap-2">
        {sizes.map(size => (
          <div key={size} className="flex w-full flex-row gap-2">
            <Typo size={size}>{size} - </Typo>
            <Typo {...defaultProps} size={size} />
          </div>
        ))}
      </div>
    );
  },
};

export const DefaultMedium: Story = {
  render: () => {
    return (
      <div className="flex w-full flex-col gap-2">
        {sizes.map(size => (
          <div key={size} className="flex w-full flex-row gap-2">
            <Typo size={size} weight="medium">
              {size} -{" "}
            </Typo>
            <Typo {...defaultProps} weight="medium" size={size} />
          </div>
        ))}
      </div>
    );
  },
};

export const Branding: Story = {
  render: () => {
    return (
      <div className="flex w-full flex-col gap-2">
        {sizes.map(size => (
          <div key={size} className="flex w-full flex-row gap-2">
            <Typo size={size} variant="brand">
              {size} -{" "}
            </Typo>
            <Typo {...defaultProps} variant="brand" size={size} />
          </div>
        ))}
      </div>
    );
  },
};

export default meta;
