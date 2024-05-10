"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useCloseAllStack } from "src/libs/react-stack";

export function RouteChangeListener() {
  const pathname = usePathname();
  const closeAllPanels = useCloseAllStack();
  const [_, setChanges] = useState(0);

  useEffect(() => {
    closeAllPanels();
    setChanges(prev => prev + 1);
  }, [pathname]);

  return <></>;
}
