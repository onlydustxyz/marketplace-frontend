import { describe, expect, it } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "src/hooks/useAuth";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";
import { ToasterProvider } from "src/hooks/useToaster";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import View from "src/_pages/ProjectDetails/View";
import ApolloWrapper from "src/providers/ApolloWrapper";
import { renderWithIntl } from "src/test/utils";

const queryClient = new QueryClient();

describe("Contributors page", () => {
  it("renders Contributors component", async () => {
    renderWithIntl(
      <MemoryRouter>
        <ImpersonationClaimsProvider>
          <ToasterProvider>
            <TokenSetProvider>
              <ApolloWrapper>
                <AuthProvider>
                  <QueryClientProvider client={queryClient}>
                    <View />
                  </QueryClientProvider>
                </AuthProvider>
              </ApolloWrapper>
            </TokenSetProvider>
          </ToasterProvider>
        </ImpersonationClaimsProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.findByText("Contributors"));
    });
  });
});
