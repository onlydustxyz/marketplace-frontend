import { AvatarNextUiAdapter } from "components/atoms/avatar/adapters/next-ui/next-ui.adapter";

import { AvatarCore } from "../avatar.core";

export function Avatar({ ...props }) {
  return <AvatarCore Adapter={AvatarNextUiAdapter} {...props} />;
}
