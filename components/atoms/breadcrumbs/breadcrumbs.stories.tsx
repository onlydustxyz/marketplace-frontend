import { Meta, StoryObj } from "@storybook/react";

import { BreadcrumbsPort } from "./breadcrumbs.types";
import { Breadcrumbs } from "./variants/breadcrumbs-default";

type Story = StoryObj<typeof Breadcrumbs>;

const defaultPort: BreadcrumbsPort = {
  items: [
    { id: "root", label: "OnlyDust app", href: "https://app.onlydust.com" },
    { id: "some_page", label: "On click handler", onClick: () => alert("Nice breadcrumbs 🫵") },
    { id: "current_page", label: "Current page" },
  ],
};

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  title: "Atoms/Breadcrumbs",
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
      source: { code: "<Breadcrumbs />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Breadcrumbs {...defaultPort} {...args} />
      </div>
    );
  },
};

export default meta;
