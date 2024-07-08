import { Meta, StoryObj } from "@storybook/react";

import { PageBanner } from "./page-banner";
import { PageBannerProps } from "./page-banner.types";

type Story = StoryObj<typeof PageBanner>;

const defaultPort: PageBannerProps = {
  message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget",
  cta: {
    text: "CTA",
    href: "https://app.onlydust.com",
    icon: "ri-fire-line",
  },
};

const meta: Meta<typeof PageBanner> = {
  component: PageBanner,
  title: "Organisms/PageBanner",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#1E1E1E" }],
    },
  },
};

export const Default: Story = {
  render: args => {
    return <PageBanner {...defaultPort} {...args} />;
  },
};

export const WithCloseButton: Story = {
  render: args => {
    return <PageBanner {...defaultPort} {...args} onClose={() => alert("Closed")} />;
  },
};

export default meta;
