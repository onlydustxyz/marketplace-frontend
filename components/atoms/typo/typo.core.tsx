import { ElementType } from "react";

import { PropsWithAdapter } from "components/types/props-with-adapter";

import { TypoPort } from "./typo.types";

export function TypoCore<C extends ElementType = "span">({ Adapter, ...props }: PropsWithAdapter<TypoPort<C>>) {
  return <Adapter {...props} />;
}
