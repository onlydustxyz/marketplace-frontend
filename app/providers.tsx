"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { NextUIProvider } from "@nextui-org/react";
import { bootstrap } from "core/bootstrap";
import { NavigationStateProvider } from "providers/navigation-state/navigation-state";
import { PropsWithChildren, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import OnboardingProvider from "src/App/OnboardingProvider";
import { Stacks } from "src/App/Stacks/Stacks.components";
import { Toaster } from "src/components/Toaster";
import Tooltip from "src/components/Tooltip";
import { viewportConfig } from "src/config";
import { SidePanelProvider } from "src/hooks/useSidePanel";
import { SidePanelStackProvider } from "src/hooks/useSidePanelStack";
import { ToasterProvider } from "src/hooks/useToaster";
import { StackProvider } from "src/libs/react-stack";

import { QueryProvider } from "components/features/api/providers/query-provider";
import { Auth0ProviderWithNavigate } from "components/features/auth0/providers/auth0-provider-with-navigate";
import { ImpersonationProvider } from "components/features/impersonation/impersonation.provider";
import { PosthogProvider } from "components/features/posthog/providers/posthog.provider";

import { IntlProvider } from "hooks/translate/use-translate";

function InitBootstrapAuth() {
  const { isAuthenticated, getAccessTokenSilently: getAccessToken, logout } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      bootstrap.setAuthProvider({ isAuthenticated, getAccessToken, logout });
    } else {
      bootstrap.setAuthProvider(null);
    }
  }, [isAuthenticated]);

  return null;
}

export default function Providers({ children }: PropsWithChildren) {
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);

  return (
    <PosthogProvider>
      <ImpersonationProvider>
        <Auth0ProviderWithNavigate>
          <IntlProvider>
            <QueryProvider>
              <NextUIProvider>
                <OnboardingProvider>
                  <NavigationStateProvider>
                    <StackProvider>
                      <SidePanelStackProvider>
                        <SidePanelProvider>
                          <ToasterProvider>
                            {children}
                            <Stacks />
                            <Toaster />
                            {/* Hide tooltips on mobile */ isSm && <Tooltip />}
                          </ToasterProvider>
                        </SidePanelProvider>
                      </SidePanelStackProvider>
                    </StackProvider>
                  </NavigationStateProvider>
                </OnboardingProvider>
              </NextUIProvider>
            </QueryProvider>
          </IntlProvider>
          <InitBootstrapAuth />
        </Auth0ProviderWithNavigate>
      </ImpersonationProvider>
    </PosthogProvider>
  );
}
