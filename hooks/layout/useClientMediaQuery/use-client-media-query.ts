import { useMediaQuery } from "usehooks-ts";

import { useClientOnly } from "components/layout/client-only/client-only";

export function useClientMediaQuery(query: string) {
  const isClient = useClientOnly();
  const breakpoint = useMediaQuery(query);

  return isClient && breakpoint;
}
