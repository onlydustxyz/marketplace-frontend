import BankLine from "src/icons/BankLine";
import ProfileRadioGroup from "src/App/Layout/Header/ProfileButton/PayoutInfoSidePanel/ProfileRadioGroup/View";

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
    { value: "BANK", label: "Crypto wire", icon: <BankLine className="text-xl" /> },
  ],
  requiredForPayment: false,
};

export const Default = {
  render: (args: Args) => <ProfileRadioGroup {...props} {...args} />,
};
