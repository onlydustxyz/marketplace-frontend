"use client";

import { PropsWithChildren } from "react";
import { useMediaQuery } from "usehooks-ts";

import Tooltip from "src/components/Tooltip";
import { viewportConfig } from "src/config";
import { ToasterProvider } from "src/hooks/useToaster";

export default function MigrationProviders({ children }: PropsWithChildren) {
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);
  return (
    <ToasterProvider>
      {children}
      {isSm && <Tooltip />}
    </ToasterProvider>
  );
}
