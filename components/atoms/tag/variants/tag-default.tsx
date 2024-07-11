import { ElementType } from "react";

import { TagAvatar } from "components/atoms/tag/variants/tag-avatar";
import { TagIcon } from "components/atoms/tag/variants/tag-icon";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { TagDefaultAdapter } from "../adapters/default/default.adapter";
import { TagPort, isTagAvatarPort, isTagIconPort } from "../tag.types";

export function Tag<C extends ElementType = "span">(props: TagPort<C>) {
  if (isTagAvatarPort(props)) return <TagAvatar {...props} />;

  if (isTagIconPort(props)) return <TagIcon {...props} />;

  return withComponentAdapter<TagPort<C>>(TagDefaultAdapter)(props);
}
