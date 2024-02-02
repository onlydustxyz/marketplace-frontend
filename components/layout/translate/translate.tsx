"use client";

import { useIntl } from "src/hooks/useIntl";

import { TTranslate } from "./translate.types";

export function Translate({ token, params, as }: TTranslate.Props) {
  const { T } = useIntl();

  if (as) {
    const Component = as;
    return <Component>{T(token, params)}</Component>;
  }

  return <>{T(token, params)}</>;
}
