"use client";

import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { useMediaQuery } from "usehooks-ts";

import { Stacks } from "src/App/Stacks/Stacks";
import Tooltip from "src/components/Tooltip";
import { viewportConfig } from "src/config";
import { ToasterProvider } from "src/hooks/useToaster";
import { StackProvider } from "src/libs/react-stack";

const BrowserRouter = dynamic(() => import("react-router-dom").then(mod => mod.BrowserRouter), { ssr: false });

export default function MigrationProviders({ children }: PropsWithChildren) {
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);
  return (
    <BrowserRouter>
      <ToasterProvider>
        <StackProvider>
          {children}
          <Stacks />
          {isSm && <Tooltip />}
        </StackProvider>
      </ToasterProvider>
    </BrowserRouter>
  );
}
