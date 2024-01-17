import { GoogleTagManager } from "@next/third-parties/google";
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
          <div id="root">{children}</div>
          <PosthogNext />
        </PosthogProvider>
      </body>
      {config.GTM_ID ? <GoogleTagManager gtmId={config.GTM_ID} /> : null}
    </html>
  );
}
