import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ApolloWrapper from "src/providers/ApolloWrapper";
import { AuthProvider } from "src/hooks/useAuth";
import App from "./App";
import "./datadog";

import "src/assets/css/index.css";
import "remixicon/fonts/remixicon.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";
import "src/assets/fonts/BelweBdBt/stylesheet.css";
import "react-tooltip/dist/react-tooltip.css";
import { IntlProvider } from "src/hooks/useIntl";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { SessionProvider } from "./hooks/useSession";
import { ToasterProvider } from "./hooks/useToaster";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider>
      <BrowserRouter>
        <SessionProvider>
          <ImpersonationClaimsProvider>
            <TokenSetProvider>
              <ToasterProvider>
                <ApolloWrapper>
                  <AuthProvider>
                    <App />
                  </AuthProvider>
                </ApolloWrapper>
              </ToasterProvider>
            </TokenSetProvider>
          </ImpersonationClaimsProvider>
        </SessionProvider>
      </BrowserRouter>
    </IntlProvider>
  </React.StrictMode>
);
