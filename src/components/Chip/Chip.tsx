import { ReactElement } from "react";
import { cn } from "src/utils/cn";

type ChipProps = {
  content: ReactElement;
  className?: string;
};

export default function Chip({ content }: ChipProps) {
  return (
    <span
      className={cn(
        `border-1 flex h-4 w-4 items-center justify-center overflow-hidden rounded-full  
        border border-greyscale-50/[0.08] bg-white/8 text-center`
      )}
    >
      {content}
    </span>
  );
}
