"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useCloseAllStack } from "src/libs/react-stack";

export function RouteChangeListener() {
  const pathname = usePathname();
  const closeAllPanels = useCloseAllStack();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("stack")) {
      return;
    }
    closeAllPanels();
  }, [pathname]);

  return null;
}
