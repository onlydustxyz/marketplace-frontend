import { ElementType } from "react";

import { Avatar } from "components/atoms/avatar";

import { TagDefaultAdapter } from "../adapters/default/default.adapter";
import { TagCore } from "../tag.core";
import { TTagAvatarProps } from "../tag.types";

export function TagAvatar<C extends ElementType = "span">({ avatar, ...props }: TTagAvatarProps<C>) {
  return <TagCore Adapter={TagDefaultAdapter} {...props} startContent={<Avatar size={"xs"} {...avatar} />} />;
}
