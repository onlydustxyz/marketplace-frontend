import { ElementType } from "react";

import { Avatar } from "components/ds/avatar/avatar";

import { TagCore } from "../tag.core";
import { TTagAvatarProps } from "../tag.types";

export function TagAvatar<C extends ElementType = "div">({ avatar, ...props }: TTagAvatarProps<C>) {
  return <TagCore {...props} startContent={<Avatar size={"xs"} {...avatar} />} />;
}
