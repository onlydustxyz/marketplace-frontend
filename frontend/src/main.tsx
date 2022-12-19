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
import { UserProvider } from "src/hooks/useUser";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider>
      <BrowserRouter>
        <ApolloWrapper>
          <AuthProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </AuthProvider>
        </ApolloWrapper>
      </BrowserRouter>
    </IntlProvider>
  </React.StrictMode>
);
