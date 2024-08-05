import { NextUIProvider } from "@nextui-org/react";
import { ClientBootstrapProvider } from "core/bootstrap/client-bootstrap-context";
import { InitBootstrapAuth } from "core/bootstrap/init-bootstrap-auth";
import { InitBootstrapImpersonation } from "core/bootstrap/init-bootstrap-impersonation";
import { NavigationStateProvider } from "providers/navigation-state/navigation-state";
import { PropsWithChildren } from "react";

import OnboardingProvider from "src/App/OnboardingProvider";

import { QueryProvider } from "components/features/api/providers/query-provider";
import { Auth0ProviderWithNavigate } from "components/features/auth0/providers/auth0-provider-with-navigate";
import { ImpersonationProvider } from "components/features/impersonation/impersonation.provider";
import { PosthogProvider } from "components/features/posthog/providers/posthog.provider";

import { IntlProvider } from "hooks/translate/use-translate";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ClientBootstrapProvider>
      <PosthogProvider>
        <ImpersonationProvider>
          <Auth0ProviderWithNavigate>
            <IntlProvider>
              <QueryProvider>
                <NextUIProvider>
                  <OnboardingProvider>
                    <NavigationStateProvider>
                      <InitBootstrapImpersonation />
                      <InitBootstrapAuth />
                      {children}
                    </NavigationStateProvider>
                  </OnboardingProvider>
                </NextUIProvider>
              </QueryProvider>
            </IntlProvider>
          </Auth0ProviderWithNavigate>
        </ImpersonationProvider>
      </PosthogProvider>
    </ClientBootstrapProvider>
  );
}
