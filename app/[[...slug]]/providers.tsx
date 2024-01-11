import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import OnboardingProvider from "src/App/OnboardingProvider";
import { Stacks } from "src/App/Stacks/Stacks.tsx";
import ErrorFallback from "src/ErrorFallback";
import Maintenance from "src/Maintenance";
import config from "src/config.ts";

import { IntlProvider } from "src/hooks/useIntl.tsx";
import { SidePanelProvider } from "src/hooks/useSidePanel";
import { SidePanelStackProvider } from "src/hooks/useSidePanelStack.tsx";
import { ToasterProvider } from "src/hooks/useToaster";
import { TokenSetProvider } from "src/hooks/useTokenSet.tsx";
import { StackProvider } from "src/libs/react-stack";
import { Auth0ProviderWithNavigate } from "components/features/auth0/providers/auth0-provider-with-navigate.tsx";
import ImpersonationProvider from "components/features/impersonation/impersonation.provider.tsx";

const App = dynamic(() => import("src/App"), { ssr: false });

// Create a client
const queryClient = new QueryClient();

export default function Providers() {
  return (
    <IntlProvider>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
            <ImpersonationProvider>
              <TokenSetProvider>
                <ToasterProvider>
                  <QueryClientProvider client={queryClient}>
                    <StackProvider>
                      <SidePanelStackProvider>
                        <SidePanelProvider>
                          {config.MAINTENANCE ? (
                            <Maintenance />
                          ) : (
                            <OnboardingProvider>
                              <App />
                              <Stacks />
                            </OnboardingProvider>
                          )}
                        </SidePanelProvider>
                      </SidePanelStackProvider>
                    </StackProvider>
                  </QueryClientProvider>
                </ToasterProvider>
              </TokenSetProvider>
            </ImpersonationProvider>
          </ErrorBoundary>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </IntlProvider>
  );
}
