import { SpaceBackgroundProps } from "./space-background.type.ts";
import { cn } from "src/utils/cn.ts";

export function SpaceBackground({ children }: SpaceBackgroundProps) {
  return (
    <>
      <div className={cn("absolute left-0 right-0 top-0  h-full w-full bg-space bg-no-repeat")} />
      {children}
    </>
  );
}

export default SpaceBackground;
