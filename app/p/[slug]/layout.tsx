import { PropsWithChildren } from "react";

import { ClientLayout } from "./components/client-layout/client-layout";

export default function ProjectLayout({ children }: PropsWithChildren) {
  return <ClientLayout>{children}</ClientLayout>;
}
