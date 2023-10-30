import { FC, ReactNode } from "react";
import { cn } from "src/utils/cn";

export interface FieldInfoMessageProps {
  children: React.ReactElement | string;
  icon?: ({ className }: { className: string }) => ReactNode;
  className?: string;
}

export const FieldInfoMessage: FC<FieldInfoMessageProps> = ({ className, icon, children }) => {
  return (
    <div className={cn("flex flex-row items-center justify-start gap-0.5", className)}>
      {icon && icon({ className: "text-[12px] text-greyscale-300" })}
      <p className="font-walsheim text-xs font-normal text-greyscale-300">{children}</p>
    </div>
  );
};
