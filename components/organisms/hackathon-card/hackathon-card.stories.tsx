import { Meta, StoryObj } from "@storybook/react";

import { HackathonCardPort } from "./hackathon-card.types";
import { HackathonCard } from "./variants/hackathon-card-default";

type Story = StoryObj<typeof HackathonCard>;

const defaultPort: HackathonCardPort<"div"> = {};

const meta: Meta<typeof HackathonCard> = {
  component: HackathonCard,
  title: "Organisms/HackathonCard",
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
      source: { code: "<HackathonCard />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <HackathonCard {...defaultPort} {...args} />
      </div>
    );
  },
};

export default meta;
