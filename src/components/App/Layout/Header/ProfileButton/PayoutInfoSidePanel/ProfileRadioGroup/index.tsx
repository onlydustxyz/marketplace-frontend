import { ReactElement } from "react";
import { useFormContext } from "react-hook-form";
import View from "./View";

type Option = {
  value: string | boolean;
  label: string;
  icon: ReactElement;
};

type Props = {
  name: string;
  label?: string;
  options: Option[];
  withMargin?: boolean;
  requiredForPayment?: boolean;
};

export default function ProfileRadioGroup({
  name,
  label,
  options,
  withMargin = true,
  requiredForPayment = false,
}: Props) {
  const { register } = useFormContext();
  return <View {...{ options, withMargin, label, register: register(name), requiredForPayment }} />;
}
