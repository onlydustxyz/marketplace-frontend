import { FC } from "react";
import { cn } from "src/utils/cn";

export interface FieldLabelProps {
  id: string;
  children: React.ReactElement | string;
  className?: string;
}

export const FieldLabel: FC<FieldLabelProps> = ({ className, children, id }) => {
  return (
    <label className={cn("text-sm font-medium text-spaceBlue-200", className)} htmlFor={id}>
      {children}
    </label>
  );
};
