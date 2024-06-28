import { ElementType } from "react";

import { Avatar } from "components/atoms/avatar";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { TagDefaultAdapter } from "../adapters/default/default.adapter";
import { TagAvatarPort } from "../tag.types";

export function TagAvatar<C extends ElementType = "span">({ avatar, ...props }: TagAvatarPort<C>) {
  return withComponentAdapter<Omit<TagAvatarPort<C>, "avatar">>(TagDefaultAdapter)({
    ...props,
    startContent: <Avatar size={"xs"} {...avatar} />,
  });
}
