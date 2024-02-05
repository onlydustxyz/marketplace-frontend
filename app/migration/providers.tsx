"use client";

import { PropsWithChildren } from "react";
import { useMediaQuery } from "usehooks-ts";

import Tooltip from "src/components/Tooltip";
import { viewportConfig } from "src/config";

export default function MigrationProviders({ children }: PropsWithChildren) {
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);
  return (
    <>
      {children}
      {isSm && <Tooltip />}
    </>
  );
}
