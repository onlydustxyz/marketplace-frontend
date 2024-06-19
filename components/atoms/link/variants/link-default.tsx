import { LinkDefaultAdapter } from "components/atoms/link/adapters/default/default.adapter";

import { LinkCore } from "../link.core";
import { LinkPort } from "../link.types";

export function Link({ ...props }: LinkPort) {
  return <LinkCore Adapter={LinkDefaultAdapter} {...props} />;
}
