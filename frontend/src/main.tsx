import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ApolloWrapper from "src/components/ApolloWrapper";
import { AuthProvider } from "src/hooks/useAuth";
import App from "./App";

import "src/assets/css/index.css";
import "remixicon/fonts/remixicon.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";
import "src/assets/fonts/BelweBdBt/stylesheet.css";
import { IntlProvider } from "src/hooks/useIntl";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { SessionProvider } from "./hooks/useSession";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider>
      <BrowserRouter>
        <SessionProvider>
          <TokenSetProvider>
            <ApolloWrapper>
              <AuthProvider>
                <App />
              </AuthProvider>
            </ApolloWrapper>
          </TokenSetProvider>
        </SessionProvider>
      </BrowserRouter>
    </IntlProvider>
  </React.StrictMode>
);
