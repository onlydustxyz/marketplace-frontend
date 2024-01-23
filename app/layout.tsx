import "remixicon/fonts/remixicon.css";
import "src/assets/css/index.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/Belwe/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { QueryProvider } from "components/features/api/providers/query-provider";
import { Auth0ProviderWithNavigate } from "components/features/auth0/providers/auth0-provider-with-navigate";
import { ImpersonationProvider } from "components/features/impersonation/impersonation.provider";
import { PosthogIdentifyUser } from "components/features/posthog/components/posthog-identify-user";
import { PosthogProvider } from "components/features/posthog/providers/posthog.provider";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import config from "src/config";
import { sharedMetadata } from "./shared-metadata";
import { ReactNode } from "react";
import { IntlProvider } from "src/hooks/useIntl";

const PosthogNext = dynamic(() => import("components/features/posthog/components/posthog-next"), {
  ssr: false,
});

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PosthogProvider>
          <Auth0ProviderWithNavigate>
            <IntlProvider>
              <ImpersonationProvider>
                <QueryProvider>
                  <div id="root">{children}</div>
                  <PosthogIdentifyUser />
                </QueryProvider>
              </ImpersonationProvider>
            </IntlProvider>
          </Auth0ProviderWithNavigate>
          <PosthogNext />
        </PosthogProvider>
      </body>
      {config.GTM_ID ? <GoogleTagManager gtmId={config.GTM_ID} /> : null}
    </html>
  );
}
