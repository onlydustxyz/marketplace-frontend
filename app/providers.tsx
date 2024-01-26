"use client";
import { PropsWithChildren } from "react";
import { PosthogProvider } from "components/features/posthog/providers/posthog.provider";
import { ImpersonationProvider } from "components/features/impersonation/impersonation.provider";
import { Auth0ProviderWithNavigate } from "components/features/auth0/providers/auth0-provider-with-navigate";
import { IntlProvider } from "src/hooks/useIntl";
import { QueryProvider } from "components/features/api/providers/query-provider";
import { NextUIProvider } from "@nextui-org/react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <PosthogProvider>
      <ImpersonationProvider>
        <Auth0ProviderWithNavigate>
          <IntlProvider>
            <QueryProvider>
              <NextUIProvider>{children}</NextUIProvider>
            </QueryProvider>
          </IntlProvider>
        </Auth0ProviderWithNavigate>
      </ImpersonationProvider>
    </PosthogProvider>
  );
}
