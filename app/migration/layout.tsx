import { ReactNode } from "react";

import Header from "src/App/Layout/Header";

import MigrationProviders from "./providers";

export default function MigrationLayout({ children }: { children: ReactNode }) {
  return (
    <MigrationProviders>
      <Header />
      <div className="fixed flex h-[calc(100dvh)] w-screen flex-col">{children}</div>
    </MigrationProviders>
  );
}
