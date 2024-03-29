import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    size: {
      control: { type: "select" },
      options: [ButtonSize.Xs, ButtonSize.Sm, ButtonSize.Md, ButtonSize.Lg, ButtonSize.LgLowHeight],
    },
    type: {
      options: [ButtonType.Primary, ButtonType.Secondary, ButtonType.Ternary],
    },
    width: {
      options: [Width.Full, Width.Fit],
    },
    iconOnly: {
      control: { type: "boolean" },
    },
  },
};

export const Default = {
  render: (args: typeof Button) => <Button {...args}>{"Complete payment information"}</Button>,
};

export const WithIcon = {
  render: (args: typeof Button) => (
    <Button {...args}>
      <i className="ri-send-plane-2-line" />
      {"Complete payment information"}
    </Button>
  ),
};

export const IconOnly = {
  render: (args: typeof Button) => (
    <Button iconOnly {...args}>
      <i className="ri-send-plane-2-line" />
    </Button>
  ),
};
