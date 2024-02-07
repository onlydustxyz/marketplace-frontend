import { Avatar as NextAvatar } from "@nextui-org/react";
import { ComponentProps } from "react";

import { cn } from "src/utils/cn";

export function Avatar(props: ComponentProps<typeof NextAvatar>) {
  return (
    <NextAvatar
      {...props}
      className={cn(props.className, {
        "ring-greyscale-50/12": props.isBordered,
      })}
      imgProps={{ loading: "lazy" }}
    />
  );
}
