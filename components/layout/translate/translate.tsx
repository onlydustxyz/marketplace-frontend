"use client";

import { useIntl, Key } from "../../../src/hooks/useIntl.tsx";

type ClientIntlProps = {
  token: Key;
  params?: { [key: string]: string | number };
};

export default function Translate({ token, params }: ClientIntlProps) {
  const { T } = useIntl();

  return <>{T(token, params)}</>;
}
