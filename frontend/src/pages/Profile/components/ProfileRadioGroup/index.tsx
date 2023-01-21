import { useFormContext } from "react-hook-form";
import View from "./View";

type Option = {
  value: string;
  label: string;
};

type PropsType = {
  name: string;
  label?: string;
  options: Option[];
};

const ProfileRadioGroup: React.FC<PropsType> = ({ name, label, options }) => {
  const { register } = useFormContext();
  return <View {...{ options, label, register: register(name) }} />;
};

export default ProfileRadioGroup;
