import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ImpersonationProvider } from "components/features/impersonation/impersonation.provider";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import OnboardingProvider from "src/App/OnboardingProvider";
import { Stacks } from "src/App/Stacks/Stacks";
import config from "src/config.ts";
import ErrorFallback from "src/ErrorFallback";
import { IntlProvider } from "src/hooks/useIntl";
import { SidePanelProvider } from "src/hooks/useSidePanel";
import { SidePanelStackProvider } from "src/hooks/useSidePanelStack";
import { ToasterProvider } from "src/hooks/useToaster";
import { StackProvider } from "src/libs/react-stack";
import Maintenance from "src/Maintenance";

const App = dynamic(() => import("src/App"), { ssr: false });

const PostHogReact = dynamic(() => import("components/features/posthog/components/posthog-react"), {
  ssr: false,
});

// Create a client
const queryClient = new QueryClient();

export default function Providers() {
  return (
    <IntlProvider>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
          <ImpersonationProvider>
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
                          <PostHogReact />
                        </OnboardingProvider>
                      )}
                    </SidePanelProvider>
                  </SidePanelStackProvider>
                </StackProvider>
              </QueryClientProvider>
            </ToasterProvider>
          </ImpersonationProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </IntlProvider>
  );
}
