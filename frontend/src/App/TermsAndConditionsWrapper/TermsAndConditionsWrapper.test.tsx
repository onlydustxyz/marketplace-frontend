import { describe, it, vi } from "vitest";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom";

import { GetTermsAndConditionsAcceptancesDocument } from "src/__generated/graphql";
import { CLAIMS_KEY, GITHUB_USERID_KEY, PROJECTS_LED_KEY, TokenSet } from "src/types";
import TermsAndConditionsAcceptanceDateProvider from ".";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { RoutePaths } from "..";

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

const graphQlMocksWithNoAcceptanceDate = [
  {
    request: {
      query: GetTermsAndConditionsAcceptancesDocument,
      variables: { userId: TEST_USER_ID },
    },
    result: {
      data: { termsAndConditionsAcceptancesByPk: {} },
    },
  },
];

const graphQlMocksWithInvalidAcceptanceDate = [
  {
    request: {
      query: GetTermsAndConditionsAcceptancesDocument,
      variables: { userId: TEST_USER_ID },
    },
    result: {
      data: { termsAndConditionsAcceptancesByPk: { acceptanceDate: 0 } },
    },
  },
];

const graphQlMocksWithValidAcceptanceDate = [
  {
    request: {
      query: GetTermsAndConditionsAcceptancesDocument,
      variables: { userId: TEST_USER_ID },
    },
    result: {
      data: { termsAndConditionsAcceptancesByPk: { acceptanceDate: 10000000000000 } },
    },
  },
];

describe("Terms and conditions wrapper", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("shouldn't render its children if the terms and conditions haven't been accepted", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE));
    renderWithIntl(
      <TermsAndConditionsAcceptanceDateProvider>
        <div>NOT TO BE DISPLAYED</div>
      </TermsAndConditionsAcceptanceDateProvider>,
      {
        wrapper: MemoryRouterProviderFactory({
          route: `${RoutePaths.Projects}`,
          mocks: graphQlMocksWithNoAcceptanceDate,
          context: {},
        }),
      }
    );
    const element = screen.queryByText("NOT TO BE DISPLAYED");
    await waitForElementToBeRemoved(element);
  });

  it("shouldn't render its children if the terms and conditions have been accepted before the last modification date", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE));
    renderWithIntl(
      <TermsAndConditionsAcceptanceDateProvider>
        <div>NOT TO BE DISPLAYED</div>
      </TermsAndConditionsAcceptanceDateProvider>,
      {
        wrapper: MemoryRouterProviderFactory({
          mocks: graphQlMocksWithInvalidAcceptanceDate,
        }),
      }
    );
    const element = screen.queryByText("NOT TO BE DISPLAYED");
    await waitForElementToBeRemoved(element);
  });

  it("should render its children if the terms and conditions have been accepted after the last modification date", async () => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE));
    renderWithIntl(
      <TermsAndConditionsAcceptanceDateProvider>
        <div>TO BE DISPLAYED</div>
      </TermsAndConditionsAcceptanceDateProvider>,
      {
        wrapper: MemoryRouterProviderFactory({
          mocks: graphQlMocksWithValidAcceptanceDate,
        }),
      }
    );
    await screen.findByText("TO BE DISPLAYED");
  });
});
