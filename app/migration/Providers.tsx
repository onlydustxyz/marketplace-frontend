"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ImpersonationClaimsProvider } from "../../src/hooks/useImpersonationClaims.tsx";
import { TokenSetProvider } from "../../src/hooks/useTokenSet.tsx";
import { IntlProvider } from "../../src/hooks/useIntl.tsx";
const queryClient = new QueryClient();

export default function MigrationProviders({ children }: PropsWithChildren) {
  return (
    <IntlProvider>
      <ImpersonationClaimsProvider>
        <TokenSetProvider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </TokenSetProvider>
      </ImpersonationClaimsProvider>
    </IntlProvider>
  );
}
