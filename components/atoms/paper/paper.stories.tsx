import { Meta, StoryObj } from "@storybook/react";

import { Typo } from "components/atoms/typo/variants/typo-default";

import { PaperLoading } from "../paper/paper.loading";
import { PaperCore } from "./paper.core";
import { TPaperProps } from "./paper.types";
import { Paper } from "./variants/paper-default";

type Story = StoryObj<typeof PaperCore>;

const defaultProps: TPaperProps<"div"> = {};

const meta: Meta<typeof PaperCore> = {
  component: PaperCore,
  title: "Atoms/Paper",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#fff" }],
    },
  },
};

export const Default: Story = {
  render: args => {
    return (
      <div className="grid gap-2">
        <Paper {...defaultProps} {...args} size={"l"}>
          Paper l
        </Paper>
        <Paper {...defaultProps} {...args}>
          Paper m (default)
        </Paper>
        <Paper {...defaultProps} {...args} size={"s"}>
          Paper s
        </Paper>
      </div>
    );
  },
};

export const Containers: Story = {
  render: args => {
    return (
      <div className="grid gap-2">
        <Paper {...defaultProps} {...args}>
          Container 1
        </Paper>
        <Paper {...defaultProps} {...args} container={"2"}>
          Container 2
        </Paper>
        <Paper {...defaultProps} {...args} container={"3"}>
          Container 3
        </Paper>
        <Paper {...defaultProps} {...args} container={"4"}>
          Container 4
        </Paper>
        <Paper {...defaultProps} {...args} container={"action"}>
          Container action
        </Paper>
        <Paper {...defaultProps} {...args} container={"inverse"}>
          <Typo classNames={{ base: "text-text-4" }}>Container inverse</Typo>
        </Paper>
      </div>
    );
  },
};

export const Skeleton: Story = {
  render: () => {
    return <PaperLoading width={"100%"} height={"200px"} />;
  },
};

export default meta;
