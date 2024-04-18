"use client";

import { Avatar } from "components/ds/avatar/avatar";
import { TAvatar } from "components/ds/avatar/avatar.types";

// need for server component usage
export function AvatarLabelled(props: TAvatar.LabelledProps) {
  return <Avatar.Labelled {...props} />;
}
