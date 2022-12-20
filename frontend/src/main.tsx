import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ApolloWrapper from "src/components/ApolloWrapper";
import { AuthProvider } from "src/hooks/useAuth";
import App from "./App";

import "src/assets/css/index.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";
import { IntlProvider } from "src/hooks/useIntl";
import { TokenSetProvider } from "src/hooks/useTokenSet";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider>
      <BrowserRouter>
        <TokenSetProvider>
          <ApolloWrapper>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ApolloWrapper>
        </TokenSetProvider>
      </BrowserRouter>
    </IntlProvider>
  </React.StrictMode>
);
