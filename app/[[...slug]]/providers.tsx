import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import OnboardingProvider from "src/App/OnboardingProvider";
import { Stacks } from "src/App/Stacks/Stacks";
import config from "src/config";
import ErrorFallback from "src/ErrorFallback";
import { SidePanelProvider } from "src/hooks/useSidePanel";
import { SidePanelStackProvider } from "src/hooks/useSidePanelStack";
import { ToasterProvider } from "src/hooks/useToaster";
import { StackProvider } from "src/libs/react-stack";
import Maintenance from "src/Maintenance";

const App = dynamic(() => import("src/App"), { ssr: false });

const PostHogReact = dynamic(() => import("components/features/posthog/components/posthog-react"), {
  ssr: false,
});

export default function Providers() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
        <ToasterProvider>
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
        </ToasterProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
