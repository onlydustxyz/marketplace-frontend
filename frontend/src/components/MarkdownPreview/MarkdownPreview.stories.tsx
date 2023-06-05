import MarkdownPreview, { Props } from ".";

export default {
  title: "MarkdownPreview",
};
const props: Props = {
  className: "text-sm",
  children: `
# 📡 Backend

## 🎗️ Prerequisites

### 1. Install nix and direnv

> Do note that this step is a work in progress in the Nix experimentation.`,
};

export const Default = {
  render: (args: Props) => <MarkdownPreview {...props} {...args} />,
};
