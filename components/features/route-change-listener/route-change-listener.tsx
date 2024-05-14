"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useCloseAllStack } from "src/libs/react-stack";

export function RouteChangeListener() {
  const pathname = usePathname();
  const closeAllPanels = useCloseAllStack();

  useEffect(() => {
    closeAllPanels();
  }, [pathname]);

  return null;
}
