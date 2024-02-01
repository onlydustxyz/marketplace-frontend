import { ReactNode } from "react";

import Header from "src/App/Layout/Header";

import MigrationProviders from "./providers";

export default function MigrationLayout({ children }: { children: ReactNode }) {
  return (
    <MigrationProviders>
      <Header />
      <div>{children}</div>
    </MigrationProviders>
  );
}
