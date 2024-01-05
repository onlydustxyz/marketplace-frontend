import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import config from "src/config";
import { sharedMetadata } from "./shared-metadata.ts";

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
      {config.GTM_ID ? <GoogleTagManager gtmId={config.GTM_ID} /> : null}
    </html>
  );
}
