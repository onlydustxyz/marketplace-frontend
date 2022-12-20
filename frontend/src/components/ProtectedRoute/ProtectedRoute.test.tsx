import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { BrowserRouter } from "react-router-dom";
import { HasuraUserRole } from "src/types";

import ProtectedRoute from ".";
import { AuthProvider } from "src/hooks/useAuth";
import { renderWithIntl } from "src/test/utils";
import { MockedProvider } from "@apollo/client/testing";
import { LOCAL_STORAGE_TOKEN_SET_KEY, TokenSetProvider } from "src/hooks/useTokenSet";

expect.extend(matchers);

const CHILD_ELEMENT_TEXT = "child-test";
const TEST_USER_ID = "test-user-id";

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: TEST_USER_ID,
  },
  accessToken: "TEST_ACCESS_TOKEN",
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

  it("should display its child element when there is a token in the local storage", () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
    renderWithIntl(
      <MockedProvider>
        <TokenSetProvider>
          <AuthProvider>
            <ProtectedRoute requiredRole={HasuraUserRole.RegisteredUser}>{CHILD_ELEMENT_TEXT}</ProtectedRoute>
          </AuthProvider>
        </TokenSetProvider>
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.queryByText(CHILD_ELEMENT_TEXT)).toBeInTheDocument();
  });

  it("should not display its child element when there is no token in the local storage", () => {
    window.localStorage.clear();
    expect(screen.queryByText(CHILD_ELEMENT_TEXT)).not.toBeInTheDocument();
  });
});
