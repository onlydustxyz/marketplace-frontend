import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

import OnboardingProvider from "src/App/OnboardingProvider";
import { Stacks } from "src/App/Stacks/Stacks";
import ErrorFallback from "src/ErrorFallback";
import Maintenance from "src/Maintenance";
import config from "src/config";
import { ToasterProvider } from "src/hooks/useToaster";

const App = dynamic(() => import("src/App"), { ssr: false });

export default function Providers() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
        <ToasterProvider>
          {config.MAINTENANCE ? (
            <Maintenance />
          ) : (
            <OnboardingProvider>
              <App />
              <Stacks />
            </OnboardingProvider>
          )}
        </ToasterProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
