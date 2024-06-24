import { ElementType } from "react";

import { PaperCore } from "../paper.core";
import { TPaperProps } from "../paper.types";

export function Paper<C extends ElementType = "article">(props: TPaperProps<C>) {
  return <PaperCore {...props} />;
}
