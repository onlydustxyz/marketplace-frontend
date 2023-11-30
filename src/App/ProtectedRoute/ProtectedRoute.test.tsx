import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { BrowserRouter } from "react-router-dom";
import { HasuraUserRole } from "src/types";

import ProtectedRoute from ".";
import { AuthProvider } from "src/hooks/useAuth";
import { renderWithIntl } from "src/test/utils";
import { MockedProvider } from "@apollo/client/testing";
import { LOCAL_STORAGE_TOKEN_SET_KEY, TokenSetProvider } from "src/hooks/useTokenSet";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";
import { ToasterProvider } from "src/hooks/useToaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

expect.extend(matchers);

const CHILD_ELEMENT_TEXT = "child-test";
const TEST_USER_ID = "test-user-id";

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: TEST_USER_ID,
  },
  accessToken: "TEST_ACCESS_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
};

vi.mock("axios", () => ({
  default: {
    post: () => ({ data: HASURA_TOKEN_BASIC_TEST_VALUE }),
  },
}));

describe('"ProtectedRoute" component', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  const NestedProviders = (
    <QueryClientProvider client={queryClient}>
      <MockedProvider>
        <ToasterProvider>
          <TokenSetProvider>
            <ImpersonationClaimsProvider>
              <AuthProvider>
                <ProtectedRoute requiredRole={HasuraUserRole.RegisteredUser}>{CHILD_ELEMENT_TEXT}</ProtectedRoute>
              </AuthProvider>
            </ImpersonationClaimsProvider>
          </TokenSetProvider>
        </ToasterProvider>
      </MockedProvider>
    </QueryClientProvider>
  );

  it("should display its child element when there is a token in the local storage", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
    renderWithIntl(NestedProviders, { wrapper: BrowserRouter });
    await waitFor(() => {
      screen.findByText(CHILD_ELEMENT_TEXT);
    });
  });

  it("should not display its child element when there is no token in the local storage", async () => {
    window.localStorage.clear();
    renderWithIntl(NestedProviders, { wrapper: BrowserRouter });
    expect(
      await waitFor(() => {
        screen.findByText(CHILD_ELEMENT_TEXT);
      })
    ).not.toBeTruthy();
  });
});
