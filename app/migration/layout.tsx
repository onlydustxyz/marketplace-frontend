import { ReactNode } from "react";

import MigrationProviders from "./providers";

export default function MigrationLayout({ children }: { children: ReactNode }) {
  return (
    <MigrationProviders>
      <div className="fixed flex flex h-[calc(100dvh)] w-screen flex-col">{children}</div>
    </MigrationProviders>
  );
}
