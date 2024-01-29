import { FC } from "react";

import { Flex } from "src/components/New/Layout/Flex";
import { cn } from "src/utils/cn";

import { Field, FieldProps } from "./Field";

export interface FieldCombinedProps extends Omit<FieldProps, "children"> {
  onChange: (...event: unknown[]) => void;
  children: (onChange: (...event: unknown[]) => void) => React.ReactElement[];
  className?: string;
}

export const FieldCombined: FC<FieldCombinedProps> = ({ onChange, className, children, ...rest }) => {
  return (
    <Field {...rest}>
      <Flex className={cn("w-full", className)}>{children(onChange)}</Flex>
    </Field>
  );
};
