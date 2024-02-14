"use client";

import { NextUIProvider } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

import { Stacks } from "src/App/Stacks/Stacks";
import { Toaster } from "src/components/Toaster";
import { IntlProvider } from "src/hooks/useIntl";
import { ToasterProvider } from "src/hooks/useToaster";

import { QueryProvider } from "components/features/api/providers/query-provider";
import { Auth0ProviderWithNavigate } from "components/features/auth0/providers/auth0-provider-with-navigate";
import { ImpersonationProvider } from "components/features/impersonation/impersonation.provider";
import { PosthogProvider } from "components/features/posthog/providers/posthog.provider";

const StackProvider = dynamic(() => import("src/libs/react-stack").then(mod => mod.StackProvider), { ssr: false });
const SidePanelStackProvider = dynamic(
  () => import("src/hooks/useSidePanelStack").then(mod => mod.SidePanelStackProvider),
  { ssr: false }
);
const SidePanelProvider = dynamic(() => import("src/hooks/useSidePanel").then(mod => mod.SidePanelProvider), {
  ssr: false,
});

const BrowserRouter = dynamic(() => import("react-router-dom").then(mod => mod.BrowserRouter), { ssr: false });

export default function Providers({ children }: PropsWithChildren) {
  return (
    <PosthogProvider>
      <ImpersonationProvider>
        <Auth0ProviderWithNavigate>
          <IntlProvider>
            <QueryProvider>
              <NextUIProvider>
                <BrowserRouter>
                  <StackProvider>
                    <SidePanelStackProvider>
                      <SidePanelProvider>
                        <ToasterProvider>
                          <Stacks />
                          {children}
                          <Toaster />
                        </ToasterProvider>
                      </SidePanelProvider>
                    </SidePanelStackProvider>
                  </StackProvider>
                </BrowserRouter>
              </NextUIProvider>
            </QueryProvider>
          </IntlProvider>
        </Auth0ProviderWithNavigate>
      </ImpersonationProvider>
    </PosthogProvider>
  );
}
