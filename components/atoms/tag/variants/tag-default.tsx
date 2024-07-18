import { ElementType } from "react";

import { TagAvatar } from "components/atoms/tag/variants/tag-avatar";
import { TagIcon } from "components/atoms/tag/variants/tag-icon";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { TagDefaultAdapter } from "../adapters/default/default.adapter";
import { TagPort } from "../tag.types";
import { isTagAvatar, isTagIcon } from "../tag.utils";

export function Tag<C extends ElementType = "span">(props: TagPort<C>) {
  if (isTagAvatar(props)) return <TagAvatar {...props} />;

  if (isTagIcon(props)) return <TagIcon {...props} />;

  return withComponentAdapter<TagPort<C>>(TagDefaultAdapter)(props);
}
