import { ComponentProps, FunctionComponent } from "react";

import { ButtonDefaultPort } from "components/atoms/button/button.types";
import { Button } from "components/atoms/button/variants/button-default";
import { RadioPort } from "components/atoms/radio";

type Radio<V extends string> = RadioPort<V, FunctionComponent<CustomButtonProps>>;

export type CustomButtonProps = ComponentProps<typeof Button> & { label: string };
export type ButtonProps = Omit<ButtonDefaultPort<"div">, "onClick" | "as" | "htmlProps">;
export type RadioProps<V extends string> = Omit<Radio<V>, "items" | "as" | "htmlProps">;

interface ClassNames {
  base: string;
}

export interface RadioButtonPort<V extends string> extends ButtonProps, RadioProps<V> {
  classNames?: Partial<ClassNames>;
  items: Array<
    Radio<V>["items"][0] & {
      label: string;
    }
  >;
}
