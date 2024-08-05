"use client";

import { PropsWithChildren } from "react";
import { useMediaQuery } from "usehooks-ts";

import { Stacks } from "src/App/Stacks/Stacks.components";
import { Toaster } from "src/components/Toaster";
import Tooltip from "src/components/Tooltip";
import { viewportConfig } from "src/config";
import { SidePanelStackProvider } from "src/hooks/useSidePanelStack";
import { ToasterProvider } from "src/hooks/useToaster";
import { StackProvider } from "src/libs/react-stack";

import { Toaster as ToasterAtom } from "components/atoms/toaster";

export default function V1Providers({ children }: PropsWithChildren) {
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);

  return (
    <StackProvider>
      <SidePanelStackProvider>
        <ToasterProvider>
          <ToasterAtom />
          <Stacks />
          <Toaster />
          {/* Hide tooltips on mobile */ isSm && <Tooltip />}
          {children}
        </ToasterProvider>
      </SidePanelStackProvider>
    </StackProvider>
  );
}
