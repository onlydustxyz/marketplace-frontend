import { ReactNode } from "react";

import MigrationProviders from "./providers";

export default function MigrationLayout({ children }: { children: ReactNode }) {
  return <MigrationProviders>{children}</MigrationProviders>;
}
