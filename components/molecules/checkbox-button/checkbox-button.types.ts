import { ButtonDefaultPort } from "../../atoms/button/button.types";
import { CheckboxPort } from "../../atoms/checkbox";

interface ClassNames {
  base: string;
  checkbox: Partial<CheckboxPort["classNames"]>;
}

export type ButtonProps = Pick<ButtonDefaultPort<"div">, "variant" | "size" | "children">;
export type CheckBoxProps = Omit<CheckboxPort, "classNames" | "color">;
export interface CheckboxButtonPort extends ButtonProps, CheckBoxProps {
  classNames?: Partial<ClassNames>;
}
