import { PropsWithAdapter } from "components/types/props-with-adapter";

import { LinkPort } from "./link.types";

export function LinkCore({ Adapter, ...props }: PropsWithAdapter<LinkPort>) {
  return <Adapter {...props} />;
}
