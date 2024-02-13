import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";

import OnboardingProvider from "src/App/OnboardingProvider";
import ErrorFallback from "src/ErrorFallback";
import Maintenance from "src/Maintenance";
import config from "src/config";

const App = dynamic(() => import("src/App"), { ssr: false });

export default function Providers() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
      {config.MAINTENANCE ? (
        <Maintenance />
      ) : (
        <OnboardingProvider>
          <App />
        </OnboardingProvider>
      )}
    </ErrorBoundary>
  );
}
