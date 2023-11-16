import { FC, ReactNode } from "react";
import { cn } from "src/utils/cn";

export enum Variant {
  Default,
  Blue,
}

const variants = {
  [Variant.Default]: {
    icon: "text-greyscale-300",
    text: "text-greyscale-300",
  },
  [Variant.Blue]: {
    icon: "text-spaceBlue-200",
    text: "text-spaceBlue-200",
  },
};

export interface FieldInfoMessageProps {
  children: React.ReactElement | string;
  icon?: ({ className }: { className: string }) => ReactNode;
  className?: string;
  variant?: Variant;
}

export const FieldInfoMessage: FC<FieldInfoMessageProps> = ({
  className,
  icon,
  children,
  variant = Variant.Default,
}) => {
  return (
    <div className={cn("flex flex-row items-center justify-start gap-0.5", className)}>
      {icon &&
        icon({
          className: cn("text-[12px]", variants[variant].icon),
        })}
      <p className={cn("font-walsheim text-xs font-normal", variants[variant].text)}>{children}</p>
    </div>
  );
};
