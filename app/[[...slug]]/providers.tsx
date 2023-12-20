import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import OnboardingProvider from "src/App/OnboardingProvider";
import { Stacks } from "src/App/Stacks/Stacks";
import ErrorFallback from "src/ErrorFallback";
import Maintenance from "src/Maintenance";
import config from "src/config";
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

const App = dynamic(() => import("src/App"), { ssr: false });

// Create a client
const queryClient = new QueryClient();

export default function Providers() {
  return (
    <IntlProvider>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
          <SessionProvider>
            <ImpersonationClaimsProvider>
              <TokenSetProvider>
                <ToasterProvider>
                  <ApolloWrapper>
                    <QueryClientProvider client={queryClient}>
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
