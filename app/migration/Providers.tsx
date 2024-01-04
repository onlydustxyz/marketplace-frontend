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
const queryClient = new QueryClient();

export default function MigrationProviders({ children }: PropsWithChildren) {
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
                </StackProvider>
              </ToasterProvider>
            </QueryClientProvider>
          </TokenSetProvider>
        </ImpersonationClaimsProvider>
      </IntlProvider>
    </BrowserRouter>
  );
}
