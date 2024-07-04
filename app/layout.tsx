import { GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "index.css";
import "keen-slider/keen-slider.min.css";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "remixicon/fonts/remixicon.css";

import { PageBanner } from "app/features/page-banner/page-banner";
import Providers from "app/providers";

import Header from "src/App/Layout/Header";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/Belwe/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";
import config from "src/config";

import { PosthogIdentifyUser } from "components/features/posthog/components/posthog-identify-user";
import { PosthogPageView } from "components/features/posthog/components/posthog-page-view";
import { RouteChangeListener } from "components/features/route-change-listener/route-change-listener";
import SpaceBackground from "components/features/space-background/space-background";

import { sharedMetadata } from "./shared-metadata";

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="z-[1] flex h-[calc(100dvh)] w-screen flex-col bg-space-gradient xl:fixed">
            <PageBanner />
            <Header />
            <SpaceBackground />
            {children}
          </div>
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
