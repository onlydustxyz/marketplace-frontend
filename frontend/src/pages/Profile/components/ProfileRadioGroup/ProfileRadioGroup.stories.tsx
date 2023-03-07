import ProfileRadioGroup from "./View";

export default {
  title: "ProfileRadioGroup",
  component: ProfileRadioGroup,
  argTypes: {
    requiredForPayment: { type: "boolean" },
  },
};

type Args = {
  requiredForPayment: boolean;
};

const props = {
  label: "Preferred method",
  options: [
    { value: "ETH", label: "Eth wire" },
    { value: "BANK", label: "Crypto wire" },
  ],
  requiredForPayment: false,
};

export const Default = {
  render: (args: Args) => <ProfileRadioGroup {...props} {...args} />,
};
