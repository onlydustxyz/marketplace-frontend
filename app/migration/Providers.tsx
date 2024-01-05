"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ImpersonationClaimsProvider } from "../../src/hooks/useImpersonationClaims.tsx";
import { TokenSetProvider } from "../../src/hooks/useTokenSet.tsx";
import { IntlProvider } from "../../src/hooks/useIntl.tsx";
import { StackProvider } from "../../src/libs/react-stack";
import { Stacks } from "../../src/App/Stacks/Stacks.tsx";
import { ToasterProvider } from "../../src/hooks/useToaster";
import { BrowserRouter } from "react-router-dom";
import Tooltip from "../../src/components/Tooltip";
import { useMediaQuery } from "usehooks-ts";
import { viewportConfig } from "../../src/config.ts";
const queryClient = new QueryClient();

export default function MigrationProviders({ children }: PropsWithChildren) {
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);
  return (
    <BrowserRouter>
      <IntlProvider>
        <ImpersonationClaimsProvider>
          <TokenSetProvider>
            <QueryClientProvider client={queryClient}>
              <ToasterProvider>
                <StackProvider>
                  {children}
                  <Stacks />
                  {isSm && <Tooltip />}
                </StackProvider>
              </ToasterProvider>
            </QueryClientProvider>
          </TokenSetProvider>
        </ImpersonationClaimsProvider>
      </IntlProvider>
    </BrowserRouter>
  );
}
