"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import TagManager from "react-gtm-module";
import { BrowserRouter } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import OnboardingProvider from "src/App/OnboardingProvider";
import { Stacks } from "src/App/Stacks/Stacks";
import ErrorFallback from "src/ErrorFallback";
import Maintenance from "src/Maintenance";
import "src/assets/css/index.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/Belwe/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";
import SEO from "src/components/SEO";
import config from "src/config";
import "src/datadog";
import { AuthProvider } from "src/hooks/useAuth";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";
import { IntlProvider } from "src/hooks/useIntl";
import { SessionProvider } from "src/hooks/useSession";
import { SidePanelProvider } from "src/hooks/useSidePanel";
import { SidePanelStackProvider } from "src/hooks/useSidePanelStack";
import { ToasterProvider } from "src/hooks/useToaster";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { StackProvider } from "src/libs/react-stack";
import ApolloWrapper from "src/providers/ApolloWrapper";
import { CommandsProvider } from "src/providers/Commands";

const App = dynamic(() => import("src/App"), { ssr: false });

if (config.GTM_ID) {
  TagManager.initialize({
    gtmId: config.GTM_ID,
  });
}

// Create a client
const queryClient = new QueryClient();

export default function Page() {
  return (
    <IntlProvider>
      <BrowserRouter>
        <SEO />
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
          <SessionProvider>
            <ImpersonationClaimsProvider>
              <TokenSetProvider>
                <ToasterProvider>
                  <ApolloWrapper>
                    <QueryClientProvider client={queryClient}>
                      <CommandsProvider>
                        <AuthProvider>
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
                        </AuthProvider>
                      </CommandsProvider>
                    </QueryClientProvider>
                  </ApolloWrapper>
                </ToasterProvider>
              </TokenSetProvider>
            </ImpersonationClaimsProvider>
          </SessionProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </IntlProvider>
  );
}
