import { cn } from "src/utils/cn";

import { TFlex } from "./flex.types";
import { flexVariants } from "./flex.variants";

export function Flex({ className, as: Component = "div", onClick, children, ...props }: TFlex.Props) {
  return (
    <Component
      className={cn(
        flexVariants({
          ...props,
        }),
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
