import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import config from "src/config";
import { sharedMetadata } from "./shared-metadata.ts";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ReactElement } from "react";

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <div id="root">{children}</div>
        </body>
      </UserProvider>
      {config.GTM_ID ? <GoogleTagManager gtmId={config.GTM_ID} /> : null}
    </html>
  );
}
