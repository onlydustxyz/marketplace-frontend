import { Avatar as NextAvatar } from "@nextui-org/react";
import { ComponentProps } from "react";

export function Avatar(props: ComponentProps<typeof NextAvatar>) {
  return (
    <NextAvatar
      {...props}
      className={props.isBordered ? "ring-greyscale-50/12" : undefined}
      imgProps={{ loading: "lazy" }}
    />
  );
}
