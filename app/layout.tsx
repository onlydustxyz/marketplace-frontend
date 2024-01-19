import { GoogleTagManager } from "@next/third-parties/google";
import { QueryProvider } from "components/features/api/providers/query-provider";
import { Auth0ProviderWithNavigate } from "components/features/auth0/providers/auth0-provider-with-navigate";
import { ImpersonationProvider } from "components/features/impersonation/impersonation.provider";
import { PosthogIdentifyUser } from "components/features/posthog/components/posthog-identify-user";
import { PosthogProvider } from "components/features/posthog/providers/posthog.provider";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import config from "src/config";
import { sharedMetadata } from "./shared-metadata.ts";

const PosthogNext = dynamic(() => import("components/features/posthog/components/posthog-next"), {
  ssr: false,
});

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PosthogProvider>
          <Auth0ProviderWithNavigate>
            <ImpersonationProvider>
              <QueryProvider>
                <div id="root">{children}</div>
                <PosthogIdentifyUser />
              </QueryProvider>
            </ImpersonationProvider>
          </Auth0ProviderWithNavigate>
          <PosthogNext />
        </PosthogProvider>
      </body>
      {config.GTM_ID ? <GoogleTagManager gtmId={config.GTM_ID} /> : null}
    </html>
  );
}
