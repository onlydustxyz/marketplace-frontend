"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ClientBootstrapProvider } from "core/bootstrap/client-bootstrap-context";
import { InitBootstrapAuth } from "core/bootstrap/init-bootstrap-auth";
import { InitBootstrapImpersonation } from "core/bootstrap/init-bootstrap-impersonation";
import { NavigationStateProvider } from "providers/navigation-state/navigation-state";
import { PropsWithChildren } from "react";
import { useMediaQuery } from "usehooks-ts";

import OnboardingProvider from "src/App/OnboardingProvider";
import { Stacks } from "src/App/Stacks/Stacks.components";
import { Toaster } from "src/components/Toaster";
import Tooltip from "src/components/Tooltip";
import { viewportConfig } from "src/config";
import { SidePanelStackProvider } from "src/hooks/useSidePanelStack";
import { ToasterProvider } from "src/hooks/useToaster";
import { StackProvider } from "src/libs/react-stack";

import { Toaster as ToasterAtom } from "components/atoms/toaster";
import { QueryProvider } from "components/features/api/providers/query-provider";
import { Auth0ProviderWithNavigate } from "components/features/auth0/providers/auth0-provider-with-navigate";
import { ImpersonationProvider } from "components/features/impersonation/impersonation.provider";
import { PosthogProvider } from "components/features/posthog/providers/posthog.provider";

import { IntlProvider } from "hooks/translate/use-translate";

export default function Providers({ children }: PropsWithChildren) {
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);

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
                      <StackProvider>
                        <SidePanelStackProvider>
                          <ToasterProvider>
                            <ToasterAtom />
                            <InitBootstrapImpersonation />
                            <InitBootstrapAuth />
                            <Stacks />
                            <Toaster />
                            {/* Hide tooltips on mobile */ isSm && <Tooltip />}
                            {children}
                          </ToasterProvider>
                        </SidePanelStackProvider>
                      </StackProvider>
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
