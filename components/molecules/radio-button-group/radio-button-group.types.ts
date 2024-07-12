import { ComponentProps, FunctionComponent, ReactNode } from "react";

import { ButtonDefaultPort } from "../../atoms/button/button.types";
import { Button } from "../../atoms/button/variants/button-default";
import { RadioGroupPort } from "../../atoms/radio-group";

type Radio<V extends string> = RadioGroupPort<V, FunctionComponent<CustomButtonProps>>;

export type CustomButtonProps = ComponentProps<typeof Button> & { label: ReactNode };
export type ButtonProps = Pick<ButtonDefaultPort<"div">, "variant" | "size">;
export type RadioGroupProps<V extends string> = Omit<Radio<V>, "items" | "as" | "htmlProps">;

interface ClassNames {
  base: string;
}

export interface RadioGroupButtonPort<V extends string> extends ButtonProps, RadioGroupProps<V> {
  classNames?: Partial<ClassNames>;
  items: Array<
    Radio<V>["items"][0] & {
      label: string;
    }
  >;
}
