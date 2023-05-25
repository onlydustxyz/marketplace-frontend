import { ReactElement } from "react";
import { useFormContext } from "react-hook-form";
import View from "./View";

type Option = {
  value: string;
  label: string;
  icon: ReactElement;
};

type PropsType = {
  name: string;
  label?: string;
  options: Option[];
  requiredForPayment?: boolean;
};

const ProfileRadioGroup: React.FC<PropsType> = ({ name, label, options, requiredForPayment = false }) => {
  const { register } = useFormContext();
  return <View {...{ options, label, register: register(name), requiredForPayment }} />;
};

export default ProfileRadioGroup;
