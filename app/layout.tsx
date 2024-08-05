import { GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import Providers from "app/providers";

import config from "src/config";

import { PosthogIdentifyUser } from "components/features/posthog/components/posthog-identify-user";
import { PosthogPageView } from "components/features/posthog/components/posthog-page-view";
import { RouteChangeListener } from "components/features/route-change-listener/route-change-listener";

import { sharedMetadata } from "./shared-metadata";

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <RouteChangeListener />
          <PosthogIdentifyUser />
          <PosthogPageView />
        </Providers>
        {config.GTM_ID ? <GoogleTagManager gtmId={config.GTM_ID} /> : null}
        <SpeedInsights />
      </body>
    </html>
  );
}
