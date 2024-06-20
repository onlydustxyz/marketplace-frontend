import { AvatarNextUiAdapter } from "components/atoms/avatar/adapters/next-ui/next-ui.adapter";

// KEEP RELATIVE FOR STORYBOOK AUTODOCS
import { AvatarCore } from "../avatar.core";
import { AvatarPort } from "../avatar.types";

export function Avatar({ ...props }: AvatarPort) {
  return <AvatarCore Adapter={AvatarNextUiAdapter} {...props} />;
}
