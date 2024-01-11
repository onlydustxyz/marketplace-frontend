"use client";

import { useIntl } from "../../../src/hooks/useIntl.tsx";
import { TTranslate } from "./translate.types.ts";

export function Translate({ token, params }: TTranslate.Props) {
  const { T } = useIntl();

  return <>{T(token, params)}</>;
}
