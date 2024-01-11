"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import { Auth0ProviderWithNavigate } from "components/features/auth0/providers/auth0-provider-with-navigate";
import ImpersonationProvider from "components/features/impersonation/impersonation.provider";

import { Stacks } from "src/App/Stacks/Stacks";
import Tooltip from "src/components/Tooltip";
import { viewportConfig } from "src/config";
import { IntlProvider } from "src/hooks/useIntl";
import { ToasterProvider } from "src/hooks/useToaster";
import { StackProvider } from "src/libs/react-stack";

const queryClient = new QueryClient();

export default function MigrationProviders({ children }: PropsWithChildren) {
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);
  return (
    <BrowserRouter>
      <IntlProvider>
        <Auth0ProviderWithNavigate>
          <ImpersonationProvider>
            <QueryClientProvider client={queryClient}>
              <ToasterProvider>
                <StackProvider>
                  {children}
                  <Stacks />
                  {isSm && <Tooltip />}
                </StackProvider>
              </ToasterProvider>
            </QueryClientProvider>
          </ImpersonationProvider>
        </Auth0ProviderWithNavigate>
      </IntlProvider>
    </BrowserRouter>
  );
}
