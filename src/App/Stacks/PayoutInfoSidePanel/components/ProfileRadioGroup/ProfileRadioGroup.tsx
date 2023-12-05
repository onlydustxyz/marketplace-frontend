import { ReactElement } from "react";
import { useFormContext } from "react-hook-form";
import View from "./ProfileRadioGroupView";

type Option = {
  value: string;
  label: string;
  icon: ReactElement;
};

type Props = {
  name: string;
  label?: string;
  options: Option[];
  showRequiredError?: boolean;
};

export default function ProfileRadioGroup({ name, label, options, showRequiredError = false }: Props) {
  const { register } = useFormContext();
  return <View {...{ options, label, register: register(name), showRequiredError }} />;
}
