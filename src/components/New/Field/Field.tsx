import { FC, ReactNode } from "react";
import { cn } from "src/utils/cn";
import { FieldLabel } from "./Label";
import { FieldInfoMessage, FieldInfoMessageProps } from "./InfoMessage";

export interface FieldProps {
  name: string;
  label?: React.ReactElement | string;
  placeholder?: string;
  children: React.ReactElement;
  infoMessage?: FieldInfoMessageProps;
  fieldClassName?: string;
  outerStartIcon?: ({ className }: { className: string }) => ReactNode;
  outerEndIcon?: ({ className }: { className: string }) => ReactNode;
}

export const Field: FC<FieldProps> = ({
  fieldClassName,
  name,
  label,
  infoMessage,
  children,
  outerEndIcon,
  outerStartIcon,
}) => {
  return (
    <div className={cn("flex w-full flex-col gap-2", fieldClassName)}>
      {label && <FieldLabel id={name}>{label}</FieldLabel>}
      <div className="flex w-full flex-1 items-center justify-start gap-1">
        {outerStartIcon && outerStartIcon({ className: "w-3.5 h-3.5 text-spaceBlue-200" })}
        {children}
        {outerEndIcon && outerEndIcon({ className: "w-3.5 h-3.5 text-spaceBlue-200" })}
      </div>
      {infoMessage && <FieldInfoMessage {...infoMessage} />}
    </div>
  );
};
