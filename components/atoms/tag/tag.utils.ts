import { ElementType } from "react";

import { TagAvatarPort, TagIconPort, TagPort } from "components/atoms/tag/tag.types";

export function isTagAvatar<C extends ElementType>(tag: TagPort<C>): tag is TagAvatarPort<C> {
  return (tag as TagAvatarPort<C>).avatar !== undefined;
}

export function isTagIcon<C extends ElementType>(tag: TagPort<C>): tag is TagIconPort<C> {
  return (tag as TagIconPort<C>).icon !== undefined;
}
