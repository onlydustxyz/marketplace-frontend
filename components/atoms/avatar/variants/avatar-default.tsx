import { AvatarNextUiAdapter } from "components/atoms/avatar/adapters/next-ui/next-ui.adapter";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

// KEEP RELATIVE FOR STORYBOOK AUTODOCS
import { AvatarPort } from "../avatar.types";

export function Avatar(props: AvatarPort) {
  return withComponentAdapter<AvatarPort>(AvatarNextUiAdapter)(props);
}
