import { cn } from "src/utils/cn";

import { CustomIcon } from "./custom-icon";
import { TIcon } from "./icon.types";

export function Icon({ customName, remixName, size = 16, color = "currentColor", className, ...props }: TIcon.Props) {
  return (
    <span className={cn("inline-flex items-center justify-center", className)} {...props}>
      {customName ? <CustomIcon name={customName} size={size} color={color} /> : null}

      {remixName ? (
        <i
          className={cn(remixName)}
          style={{
            fontSize: `${size}px`,
            lineHeight: 1,
            color,
          }}
        />
      ) : null}
    </span>
  );
}
