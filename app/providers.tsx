"use client";

import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";

import { IntlProvider } from "src/hooks/useIntl";
import { SidePanelProvider } from "src/hooks/useSidePanel";
import { SidePanelStackProvider } from "src/hooks/useSidePanelStack";
import { StackProvider } from "src/libs/react-stack";

import { QueryProvider } from "components/features/api/providers/query-provider";
import { Auth0ProviderWithNavigate } from "components/features/auth0/providers/auth0-provider-with-navigate";
import { ImpersonationProvider } from "components/features/impersonation/impersonation.provider";
import { PosthogProvider } from "components/features/posthog/providers/posthog.provider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <PosthogProvider>
      <ImpersonationProvider>
        <Auth0ProviderWithNavigate>
          <IntlProvider>
            <QueryProvider>
              <StackProvider>
                <SidePanelStackProvider>
                  <SidePanelProvider>
                    <NextUIProvider>{children}</NextUIProvider>
                  </SidePanelProvider>
                </SidePanelStackProvider>
              </StackProvider>
            </QueryProvider>
          </IntlProvider>
        </Auth0ProviderWithNavigate>
      </ImpersonationProvider>
    </PosthogProvider>
  );
}
