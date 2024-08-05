import { Meta, StoryObj } from "@storybook/react";

import { ApplyIssueCard } from "app/(v1)/p/[slug]/components/apply-issue-card/apply-issue-card";
import { TApplyIssueCard } from "app/(v1)/p/[slug]/components/apply-issue-card/apply-issue-card.types";

type Story = StoryObj<typeof ApplyIssueCard>;

const defaultProps: TApplyIssueCard.Props = {
  iconProps: { remixName: "ri-heart-2-fill" },
  titleProps: { children: "Title" },
  children: "Content",
};

const meta: Meta<typeof ApplyIssueCard> = {
  component: ApplyIssueCard,
  title: "Local/ApplyIssueCard",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
};

export const Default: Story = {
  render: args => {
    return <ApplyIssueCard {...defaultProps} {...args} />;
  },
};

export default meta;
