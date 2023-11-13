import { FC, ReactNode } from "react";
import { cn } from "src/utils/cn";

export interface FieldInfoMessageProps {
  children: React.ReactElement | string;
  icon?: ({ className }: { className: string }) => ReactNode;
  className?: string;
  colors?: "spaceBlue" | "greyScale";
}

export const FieldInfoMessage: FC<FieldInfoMessageProps> = ({ className, icon, children, colors }) => {
  return (
    <div className={cn("flex flex-row items-center justify-start gap-0.5", className)}>
      {icon &&
        icon({
          className: cn("text-[12px] text-greyscale-300", {
            "text-greyscale-300": !colors || colors === "greyScale",
            "text-spaceBlue-200": colors === "spaceBlue",
          }),
        })}
      <p
        className={cn("font-walsheim text-xs font-normal text-greyscale-300", {
          "text-greyscale-300": !colors || colors === "greyScale",
          "text-spaceBlue-200": colors === "spaceBlue",
        })}
      >
        {children}
      </p>
    </div>
  );
};
