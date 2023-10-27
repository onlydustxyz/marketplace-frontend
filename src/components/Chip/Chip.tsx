import { PropsWithChildren } from "react";
import { cn } from "src/utils/cn";

type ChipProps = {
  className?: string;
  solid?: boolean;
} & PropsWithChildren;

export function Chip({ children, className, solid }: ChipProps) {
  return (
    <span
      className={cn(
        `border-1 flex h-4 w-4 items-center justify-center overflow-hidden rounded-full
        border border-greyscale-50/[0.08] bg-white/8 text-center`,
        solid && "border-greyscale-700 bg-greyscale-800", // using px as figma because of the transparency
        className
      )}
    >
      {children}
    </span>
  );
}
