"use client";

import { useIntl } from "src/hooks/useIntl";

import { TTranslate } from "./translate.types";

export function Translate({ token, params }: TTranslate.Props) {
  const { T } = useIntl();

  return <>{T(token, params)}</>;
}
