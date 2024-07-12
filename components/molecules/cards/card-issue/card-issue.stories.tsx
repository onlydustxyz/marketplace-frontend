import { Meta, StoryObj } from "@storybook/react";

import { CardIssuePort } from "./card-issue.types";
import { CardIssue } from "./variants/card-issue-default";

type Story = StoryObj<typeof CardIssue>;

const defaultProps: CardIssuePort<"div"> = {
  applyActionProps: {
    children: "Apply",
  },
  viewActionProps: {
    children: "View application",
  },
  title: "Fix UI Bug on Transaction History Page",
  tags: [{ children: "React" }, { children: "OD hack" }, { children: "GFI" }],
};

const meta: Meta<typeof CardIssue> = {
  component: CardIssue,
  title: "Molecules/Cards/CardIssue",
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
      source: { code: "<CardIssue />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[544px] items-center gap-2">
        <CardIssue {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
