import { PropsWithAdapter } from "components/types/props-with-adapter";

import { AvatarPort } from "./avatar.types";

export function AvatarCore({ Adapter, ...props }: PropsWithAdapter<AvatarPort>) {
  return <Adapter {...props} />;
}
