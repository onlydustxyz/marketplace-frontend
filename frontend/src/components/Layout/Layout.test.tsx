import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import Layout from ".";
import { AuthProvider, LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useAuth";
import { BrowserRouter } from "react-router-dom";
import { renderWithIntl } from "src/test/utils";

expect.extend(matchers);

const HASURA_TOKEN_TEST_VALUE = "test";
const ONLYDUST_TITLE_NAME_QUERY = /onlydust title/i;
const ONLYDUST_LOGO_NAME_QUERY = /onlydust logo/i;
const GITHUB_LOGO_NAME_QUERY = /github logo/i;

vi.mock("axios", () => ({
  default: {
    post: () => ({ data: HASURA_TOKEN_TEST_VALUE }),
  },
}));

describe('"Layout" component', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("should always display the onlydust logo", async () => {
    renderWithIntl(
      <AuthProvider>
        <Layout />
      </AuthProvider>,
      { wrapper: BrowserRouter }
    );
    await screen.findByRole("img", {
      name: ONLYDUST_LOGO_NAME_QUERY,
    });
  });

  it("should display the github logo when there is no hasura jwt in the local storage", async () => {
    renderWithIntl(
      <AuthProvider>
        <Layout />
      </AuthProvider>,
      { wrapper: BrowserRouter }
    );
    await screen.findByRole("img", {
      name: GITHUB_LOGO_NAME_QUERY,
    });
  });

  it("should display the onlydust logo and title if there is no hasura jwt", () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_TEST_VALUE));
    renderWithIntl(
      <AuthProvider>
        <Layout />
      </AuthProvider>,
      { wrapper: BrowserRouter }
    );
    expect(
      screen.getByRole("img", {
        name: ONLYDUST_LOGO_NAME_QUERY,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: ONLYDUST_TITLE_NAME_QUERY,
      })
    ).toBeInTheDocument();
  });
});
