import { describe, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TermsAndConditions from ".";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { CLAIMS_KEY, GITHUB_USERID_KEY, PROJECTS_LED_KEY, TokenSet } from "src/types";
import { AcceptTermsAndConditionsDocument, GetOnboardingStateDocument } from "src/__generated/graphql";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";

const TEST_USER_ID = "test-user-id";
const TEST_GITHUB_USER_ID = 123456789;
const TEST_PROJECT_ID = "test-project-id";

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: TEST_USER_ID,
  },
  accessToken: "TEST_ACCESS_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
};

const HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE = {
  user: {
    id: TEST_USER_ID,
  },
  accessToken: "VALID_ACCESS_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
  refreshToken: "test-refresh-token",
};

vi.mock("axios", () => ({
  default: {
    post: (url: string, tokenSet?: TokenSet) => ({
      data: tokenSet?.refreshToken ? HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE : HASURA_TOKEN_BASIC_TEST_VALUE,
    }),
  },
}));

vi.mock("jwt-decode", () => ({
  default: (jwt: string) => {
    if (jwt === "VALID_ACCESS_TOKEN") {
      return {
        [CLAIMS_KEY]: { [PROJECTS_LED_KEY]: `{"${TEST_PROJECT_ID}"}`, [GITHUB_USERID_KEY]: TEST_GITHUB_USER_ID },
      };
    } else throw "Error";
  },
}));

const mocks = [
  {
    request: {
      query: AcceptTermsAndConditionsDocument,
    },
    result: { data: { acceptTermsAndConditions: {} } },
  },
  {
    request: {
      query: GetOnboardingStateDocument,
      variables: {
        userId: TEST_USER_ID,
      },
    },
    result: { data: { onboardingsByPk: { termsAndConditionsAcceptanceDate: "2023-06-13T16:07:59.125227" } } },
  },
];

describe("Terms and Conditions page", () => {
  it("the terms and conditions should be clickable", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE));
    renderWithIntl(<TermsAndConditions />, { wrapper: MemoryRouterProviderFactory({ mocks }) });
    await userEvent.click(await screen.findByText("Let’s get reading!"));
    await screen.findByText("Summary of our Terms & Conditions");
    // this button should be disabled
    await userEvent.click(await screen.findByText("Confirm"));
    await userEvent.click(await screen.findByRole("checkbox"));
    await userEvent.click(await screen.findByText("Confirm"));
    expect(screen.queryByText("Accept terms and conditions")).not.toBeInTheDocument();
  });
});
