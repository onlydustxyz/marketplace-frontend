import { ReactElement } from "react";
import { useFormContext } from "react-hook-form";
import View from "./View";

type Option = {
  value: string;
  label: string;
  icon: ReactElement;
};

type Props = {
  name: string;
  label?: string;
  options: Option[];
  requiredForPayment?: boolean;
};

export default function ProfileRadioGroup({ name, label, options, requiredForPayment = false }: Props) {
  const { register } = useFormContext();
  return <View {...{ options, label, register: register(name), requiredForPayment }} />;
}
