import { ElementType } from "react";

import { TypoDefaultAdapter } from "components/atoms/typo/adapters/default/default.adapter";

import { TypoCore } from "../typo.core";
import { TypoPort } from "../typo.types";

export function Typo<C extends ElementType = "span">(props: TypoPort<C>) {
  return <TypoCore Adapter={TypoDefaultAdapter} {...props} />;
}
