import { Meta, StoryObj } from "@storybook/react";

import { LinkLoading } from "components/atoms/link/link.loading";
import { LinkButton } from "components/atoms/link/variants/link-button";

import { LinkCore } from "./link.core";
import { TLinkProps } from "./link.types";
import { Link } from "./variants/link-default";

type Story = StoryObj<typeof LinkCore>;

const defaultProps: TLinkProps = {
  href: "https://www.google.com",
  children: "action link",
};

const meta: Meta<typeof LinkCore> = {
  component: LinkCore,
  title: "Atoms/Link",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#1E1E1E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Link href='..' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Link {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Inverse: Story = {
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#FFF" }],
    },
    docs: {
      source: { code: "<Link href='..' color='inverse' />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <Link {...defaultProps} color={"inverse"} />
      </div>
    );
  },
};
export const Button: Story = {
  parameters: {
    docs: {
      source: { code: "<LinkButton  />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <LinkButton>Action button</LinkButton>
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<LinkLoading  />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <LinkLoading />
      </div>
    );
  },
};

export default meta;
