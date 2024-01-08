"use client";

import { useIntl, Key } from "../../../src/hooks/useIntl.tsx";

export type TranslateProps = {
  token: Key;
  params?: { [key: string]: string | number };
};

export default function Translate({ token, params }: TranslateProps) {
  const { T } = useIntl();

  return <>{T(token, params)}</>;
}
