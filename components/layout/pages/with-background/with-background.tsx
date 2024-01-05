import { WithBackgroundProps } from "./with-background.type.ts";
import { cn } from "tailwind-variants";

export function PageWithBackground(props: WithBackgroundProps) {
  return (
    <div
      className={cn(
        "h-full w-full overflow-y-auto bg-space bg-no-repeat scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5",
        roundedBorders,
        className
      )}
    >
      <div className={cn("h-full", innerClassName)}>{children}</div>
    </div>
  );
}

export default PageWithBackground;
