import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

import ProfilePage from ".";
import { GET_PROFILE_QUERY } from "src/pages/Profile";
import { CLAIMS_KEY, PROJECTS_LED_KEY, UserInfo } from "src/types";
import { RoutePaths } from "src/App";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { UPDATE_USER_MUTATION } from "./components/ProfileForm";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";

const mockUser = {
  id: "test-user-id",
  infos: {
    email: "test@user.email",
    identity: {
      Person: {
        firstname: "Nicolas",
        lastname: "Ngomai",
      },
    },
    location: {
      number: "34",
      street: "rue Lakanal",
      city: "Grenoble",
      country: "France",
      post_code: "38000",
    },
    payoutSettings: {
      EthTransfer: "0x1234567890",
    }
  }
};

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: mockUser.id,
  },
  accessToken: "SOME_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
};

expect.extend(matchers);

vi.mock("jwt-decode", () => ({
  default: () => ({ [CLAIMS_KEY]: { [PROJECTS_LED_KEY]: '{"test-project-id"}' } }),
}));

const buildMockProfileQuery = (userResponse: UserInfo) => ({
  request: {
    query: GET_PROFILE_QUERY,
  },
  result: {
    data: {
      userInfo: [userResponse],
    },
  },
});

const buildMockMutationUpdateUser = (userId: string, userInfo: UserInfo) => ({
  request: {
    query: UPDATE_USER_MUTATION,
    variables: {
      email: userInfo.email,
      identity: userInfo.identity.Person ? { type: "PERSON", optPerson: { lastname: userInfo.identity.Person.lastname, firstname: userInfo.identity.Person.firstname } } : { type: "COMPANY", optCompany: { id: userInfo.identity.Company?.id, name: userInfo.identity.Company?.name } },
      location: userInfo.location,
      payoutSettings: userInfo.payoutSettings.EthTransfer ? { type: "ETHEREUM_ADDRESS", optEthAddress: userInfo.payoutSettings.EthTransfer } : { type: "BANK_ADDRESS", optBankAddress: { iban: userInfo.payoutSettings.WireTransfer?.iban, bic: userInfo.payoutSettings.WireTransfer?.bic } }
    },
  },
  result: { data: { userId } },
});

describe('"Profile" page', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  beforeEach(() => {
    renderWithIntl(<ProfilePage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [
          buildMockProfileQuery(mockUser.infos),
          buildMockMutationUpdateUser(mockUser.id, mockUser.infos),
        ],
      }),
    });
  });

  it("should print form with default values", async () => {
    await screen.findByText("Edit profile");
    expect((await screen.findByLabelText<HTMLInputElement>("Firstname")).value).toBe(mockUser.infos.identity.Person.firstname);
    expect((await screen.findByLabelText<HTMLInputElement>("Lastname")).value).toBe(mockUser.infos.identity.Person.lastname);
    expect((await screen.findByLabelText<HTMLInputElement>("Email")).value).toBe(mockUser.infos.email);
    expect((await screen.findByLabelText<HTMLInputElement>("N.")).value).toBe(mockUser.infos.location.number);
    expect((await screen.findByLabelText<HTMLInputElement>("Street")).value).toBe(mockUser.infos.location.street);
    expect((await screen.findByPlaceholderText<HTMLInputElement>("Zip code")).value).toBe(
      mockUser.infos.location.post_code
    );
    expect((await screen.findByPlaceholderText<HTMLInputElement>("City")).value).toBe(mockUser.infos.location.city);
    expect((await screen.findByPlaceholderText<HTMLInputElement>("Country")).value).toBe(
      mockUser.infos.location.country
    );
    expect((await screen.findByPlaceholderText<HTMLInputElement>("Ethereum wallet address")).value).toBe(
      mockUser.infos.payoutSettings.EthTransfer
    );
  });

  it("should display error when required field missing", async () => {
    await userEvent.clear(await screen.findByLabelText<HTMLInputElement>("Email"));
    await userEvent.clear(await screen.findByLabelText<HTMLInputElement>("Firstname"));
    expect((await screen.findByLabelText<HTMLInputElement>("Email")).value).toBe("");
    await userEvent.click(await screen.findByText("Send"));
    waitFor(() => {
      const errorMessages = screen.getAllByText("Required");
      expect(errorMessages.length).toBe(2);
    });
  });

  it("should display success message on success", async () => {
    // This triggers an error message 'Missing field updateUser'. The related issue on Apollo: https://github.com/apollographql/apollo-client/issues/8677
    await userEvent.click(await screen.findByText("Send"));
    waitFor(() => {
      const successMessage = screen.getByText("Your data has been saved!");
      expect(successMessage).toBeInTheDocument();
    });
  });
});
