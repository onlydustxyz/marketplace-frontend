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
        <meta property="og:title" content="Only Dust — Forge your developer legacy" data-react-helmet="true" />
        <meta property="og:type" content="website" data-react-helmet="true" />
        <meta property="og:site_name" content="OnlyDust" data-react-helmet="true" />
        <meta property="og:url" content={config.ASSET_PATH} data-react-helmet="true" />
        <meta
          property="og:description"
          content="Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach."
          data-react-helmet="true"
        />
        <meta
          property="og:image"
          content="https://onlydust-app-images.s3.eu-west-1.amazonaws.com/thumbnail.png"
          data-react-helmet="true"
        />
        <meta
          property="og:image:alt"
          content="Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach."
          data-react-helmet="true"
        />
        <meta property="og:image:type" content="image/png" data-react-helmet="true" />
        <meta property="og:image:width" content="1200" data-react-helmet="true" />
        <meta property="og:image:height" content="628" data-react-helmet="true" />
        <meta name="twitter:card" content="summary_large_image" data-react-helmet="true" />
        <meta name="twitter:site" content="@OnlyDust_xyz" data-react-helmet="true" />
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
