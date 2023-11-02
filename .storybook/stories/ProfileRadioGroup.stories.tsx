import BankLine from "src/icons/BankLine";
import ProfileRadioGroup from "src/App/Layout/Header/ProfileButton/PayoutInfoSidePanel/components/ProfileRadioGroup/ProfileRadioGroupView";

export default {
  title: "ProfileRadioGroup",
  component: ProfileRadioGroup,
  argTypes: {
    showRequiredError: { type: "boolean" },
  },
};

type Args = {
  showRequiredError: boolean;
};

const props = {
  label: "Preferred method",
  options: [
    { value: "ETH", label: "Eth wire" },
    { value: "BANK", label: "Crypto wire", icon: <BankLine className="text-xl" /> },
  ],
  showRequiredError: false,
};

export const Default = {
  render: (args: Args) => <ProfileRadioGroup {...props} {...args} />,
};
