import { ElementType } from "react";

import { Avatar } from "components/atoms/avatar";

import { TagCore } from "../tag.core";
import { TTagAvatarProps } from "../tag.types";

export function TagAvatar<C extends ElementType = "span">({ avatar, ...props }: TTagAvatarProps<C>) {
  return <TagCore {...props} startContent={<Avatar size={"xs"} {...avatar} />} />;
}
