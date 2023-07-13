import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TagManager from "react-gtm-module";
import { ErrorBoundary } from "react-error-boundary";

import ApolloWrapper from "src/providers/ApolloWrapper";
import OnboardingProvider from "./App/OnboardingProvider";
import { AuthProvider } from "src/hooks/useAuth";
import App from "./App";
import "./datadog";

import "src/assets/css/index.css";
import "remixicon/fonts/remixicon.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";
import "src/assets/fonts/BelweBdBt/stylesheet.css";
import { IntlProvider } from "src/hooks/useIntl";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { SessionProvider } from "./hooks/useSession";
import { ToasterProvider } from "./hooks/useToaster";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";
import ErrorFallback from "./ErrorFallback";
import config from "./config";
import Maintenance from "./Maintenance";
import { ContributorProfilePanelProvider } from "./hooks/useContributorProfilePanel";
import { SidePanelStackProvider } from "./hooks/useSidePanelStack";
import { CommandsProvider } from "./providers/Commands";
import { SidePanelProvider } from "./hooks/useSidePanel";
import { Helmet } from "react-helmet";

if (config.GTM_ID) {
  TagManager.initialize({
    gtmId: config.GTM_ID,
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <IntlProvider>
    <BrowserRouter>
      <Helmet>
        <title>Only Dust — Forge your developer legacy</title>
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach."
        />
        <meta property="og:image" content="https://onlydust-app-images.s3.eu-west-1.amazonaws.com/thumbnail.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
        <SessionProvider>
          <ImpersonationClaimsProvider>
            <TokenSetProvider>
              <ToasterProvider>
                <ApolloWrapper>
                  <CommandsProvider>
                    <AuthProvider>
                      <SidePanelStackProvider>
                        <SidePanelProvider>
                          <ContributorProfilePanelProvider>
                            {config.MAINTENANCE ? (
                              <Maintenance />
                            ) : (
                              <OnboardingProvider>
                                <App />
                              </OnboardingProvider>
                            )}
                          </ContributorProfilePanelProvider>
                        </SidePanelProvider>
                      </SidePanelStackProvider>
                    </AuthProvider>
                  </CommandsProvider>
                </ApolloWrapper>
              </ToasterProvider>
            </TokenSetProvider>
          </ImpersonationClaimsProvider>
        </SessionProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </IntlProvider>
);
