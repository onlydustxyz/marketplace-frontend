import { ElementType } from "react";

import { TypoCore } from "../typo.core";
import { TTypoProps } from "../typo.types";

export function Typo<C extends ElementType = "span">({ ...props }: TTypoProps<C>) {
  return <TypoCore {...props} />;
}
