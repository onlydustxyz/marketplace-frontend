import { Meta, StoryObj } from "@storybook/react";

import { CardProjectLoading } from "components/molecules/cards/card-project/card-project.loading";

import { CardProjectPort } from "./card-project.types";
import { CardProject } from "./variants/card-project-default";

type Story = StoryObj<typeof CardProject>;

const defaultProps: CardProjectPort<"div"> = {
  avatarProps: {},
  title: "Starknet dart",
  description: "The goal of this SDK is to be able to interact with StarkNet smart contracts in a type-safe way.",
  bottomTags: [{ children: "Starknet", avatar: { src: "" } }],
  topTags: [{ children: "Top Project" }],
  primaryActionProps: { children: "Button" },
  secondaryActionProps: { children: "Button" },
};

const meta: Meta<typeof CardProject> = {
  component: CardProject,
  title: "Molecules/Cards/CardProject",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#000" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<CardProject />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[370px] items-center gap-2">
        <CardProject {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<CardProjectLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[370px] items-center gap-2">
        <CardProjectLoading />
      </div>
    );
  },
};

export default meta;
