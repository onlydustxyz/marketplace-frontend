import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

import ProfilePage from ".";
import { GET_PROFILE_QUERY } from "src/pages/Profile";
import { CLAIMS_KEY, PROJECTS_LED_KEY } from "src/types";
import { RoutePaths } from "src/App";
import { MemoryRouterProviderFactory, renderWithIntl } from "src/test/utils";
import { UPDATE_USER_MUTATION } from "./components/ProfileForm";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import {
  IdentityInput,
  PayoutSettingsInput,
  Location,
  UserInfo,
  IdentityType,
  PayoutSettingsType,
  UpdateProfileInfoMutationVariables,
} from "src/__generated/graphql";

const INVALID_ETHEREUM_ADDRESS = "0x1234567890";
const VALID_ETHEREUM_ADDRESS = "0xebec795c9c8bbd61ffc14a6662944748f299cacf";
const VALID_ENS = "vitalik.eth";

const mockUser: UserInfo = {
  userId: "test-user-id",
  email: "test@user.email",
  identity: {
    Person: {
      firstname: "Nicolas",
      lastname: "Ngomai",
    },
  },
  location: {
    address: "34 rue Lakanal",
    city: "Grenoble",
    country: "France",
    post_code: "38000",
  },
  payoutSettings: {
    EthTransfer: { Address: INVALID_ETHEREUM_ADDRESS },
  },
};

const mockUserWithEns: UserInfo = {
  userId: "test-user-id",
  email: "test@user.email",
  identity: {
    Person: {
      firstname: "Nicolas",
      lastname: "Ngomai",
    },
  },
  location: {
    address: "34 rue Lakanal",
    city: "Grenoble",
    country: "France",
    post_code: "38000",
  },
  payoutSettings: {
    EthTransfer: { Name: VALID_ENS },
  },
};

const mockCompany: UserInfo = {
  userId: "test-company-id",
  email: "james.bond@mi6.uk",
  identity: {
    Company: {
      id: "007",
      name: "MI6",
    },
  },
  location: {
    address: "7 big ben street",
    city: "London",
    country: "United Kingdom",
    post_code: "EC",
  },
  payoutSettings: {
    WireTransfer: {
      BIC: "BNPCFR21",
      IBAN: "FR7610107001011234567890129",
    },
  },
};

const accessToken = (userId: string) => ({
  user: {
    id: userId,
  },
  accessToken: "SOME_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
});

vi.mock("axios", () => ({
  default: {
    post: () => ({
      data: accessToken("test-user-id"),
    }),
  },
}));

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

const buildMockMutationUpdateUser = (userInfo: UserInfo) => {
  const identity: IdentityInput = userInfo.identity.Person
    ? {
        type: IdentityType.Person,
        optPerson: { lastname: userInfo.identity.Person.lastname, firstname: userInfo.identity.Person.firstname },
        optCompany: null,
      }
    : {
        type: IdentityType.Company,
        optCompany: { name: userInfo.identity.Company?.name },
        optPerson: null,
      };

  const location: Location = {
    address: userInfo.location.address,
    postCode: userInfo.location.post_code,
    city: userInfo.location.city,
    country: userInfo.location.country,
  };

  const payoutSettings: PayoutSettingsInput = userInfo.payoutSettings.EthTransfer
    ? {
        type: userInfo.payoutSettings.EthTransfer.Address
          ? PayoutSettingsType.EthereumAddress
          : PayoutSettingsType.EthereumName,
        optEthAddress: userInfo.payoutSettings.EthTransfer.Address ? VALID_ETHEREUM_ADDRESS : null,
        optBankAddress: null,
        optEthName: userInfo.payoutSettings.EthTransfer.Name || null,
      }
    : {
        type: PayoutSettingsType.BankAddress,
        optBankAddress: {
          IBAN: userInfo.payoutSettings.WireTransfer?.IBAN,
          BIC: userInfo.payoutSettings.WireTransfer?.BIC,
        },
        optEthAddress: null,
        optEthName: null,
      };

  const variables: UpdateProfileInfoMutationVariables = {
    email: userInfo.email,
    identity,
    location,
    payoutSettings,
  };

  return {
    request: {
      query: UPDATE_USER_MUTATION,
      variables,
    },
    newData: vi.fn(() => ({ data: { updateProfileInfo: userInfo.userId } })),
  };
};

describe("Missing payment information banner", () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(accessToken(mockUser.userId)));
  });

  it("should display the information banner if payment info is missing", async () => {
    renderWithIntl(<ProfilePage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [buildMockProfileQuery({ ...mockUser, payoutSettings: {} })],
      }),
    });
    await screen.findByText("Payout information missing");
  });

  it("shouldn't display the information banner if payment info is correct", async () => {
    renderWithIntl(<ProfilePage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [
          buildMockProfileQuery({
            ...mockUser,
            payoutSettings: { WireTransfer: { IBAN: "test-iban", BIC: "test-bic" } },
          }),
        ],
      }),
    });
    await waitFor(() => {
      expect(screen.queryByText("Payout information missing")).not.toBeInTheDocument();
    });
  });
});

describe('"Profile" page for individual', () => {
  const profileQueryMock = buildMockProfileQuery(mockUser);
  const updateUserMock = buildMockMutationUpdateUser(mockUser);
  const updateEnsUserMock = buildMockMutationUpdateUser(mockUserWithEns);

  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(accessToken(mockUser.userId)));
  });

  beforeEach(() => {
    renderWithIntl(<ProfilePage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [profileQueryMock, updateUserMock, updateEnsUserMock],
      }),
    });
  });

  it("should not navigate to projects screen when clicking Save profile with invalid Ethereum address", async () => {
    // This triggers an error message 'Missing field updateUser'. The related issue on Apollo: https://github.com/apollographql/apollo-client/issues/8677
    await userEvent.click(await screen.findByText("Save profile"));
    await waitFor(() => {
      expect(screen.queryByText("Success !")).not.toBeInTheDocument();
    });
  });

  it("should navigate to projects screen when clicking Save profile with valid Ethereum address", async () => {
    // This triggers an error message 'Missing field updateUser'. The related issue on Apollo: https://github.com/apollographql/apollo-client/issues/8677

    await userEvent.click(await screen.findByText("Crypto wire"));
    await screen.findByDisplayValue(INVALID_ETHEREUM_ADDRESS);
    await userEvent.clear(await screen.findByPlaceholderText<HTMLInputElement>("ETH address or ENS name"));
    await userEvent.type(
      await screen.findByPlaceholderText<HTMLInputElement>("ETH address or ENS name"),
      VALID_ETHEREUM_ADDRESS
    );
    await screen.findByDisplayValue(VALID_ETHEREUM_ADDRESS);
    await userEvent.click(await screen.findByTestId("profile-form-submit-button"));
    await waitFor(() => {
      expect(updateUserMock.newData).toHaveBeenCalledOnce();
    });
  });

  it("should not navigate to projects screen when clicking Save profile with invalid IBAN", async () => {
    // This triggers an error message 'Missing field updateUser'. The related issue on Apollo: https://github.com/apollographql/apollo-client/issues/8677
    await userEvent.click(
      await screen.findByRole("radio", {
        name: /bank wire/i,
      })
    );
    await userEvent.type(await screen.findByPlaceholderText<HTMLInputElement>("IBAN"), "invalid_iban");
    await userEvent.click(await screen.findByText("Save profile"));
    await waitFor(() => {
      expect(screen.queryByText("Success !")).not.toBeInTheDocument();
    });
  });

  it("should not navigate to projects screen when clicking Save profile with invalid BIC", async () => {
    // This triggers an error message 'Missing field updateUser'. The related issue on Apollo: https://github.com/apollographql/apollo-client/issues/8677
    await userEvent.click(
      await screen.findByRole("radio", {
        name: /bank wire/i,
      })
    );
    await userEvent.type(await screen.findByPlaceholderText<HTMLInputElement>("BIC"), "invalid_bic");
    await userEvent.click(await screen.findByText("Save profile"));
    await waitFor(() => {
      expect(screen.queryByText("Success !")).not.toBeInTheDocument();
    });
  });

  it("should ask for required IBAN when only filling BIC", async () => {
    // This triggers an error message 'Missing field updateUser'. The related issue on Apollo: https://github.com/apollographql/apollo-client/issues/8677
    await userEvent.click(
      await screen.findByRole("radio", {
        name: /bank wire/i,
      })
    );
    await userEvent.type(await screen.findByPlaceholderText<HTMLInputElement>("BIC"), "BNPCFR21");
    await userEvent.click(await screen.findByText("Save profile"));
    await waitFor(() => {
      const errorMessages = screen.getAllByText("Required");
      expect(errorMessages.length).toBe(1);
    });
  });

  it("should send only relevant values to the backend", async () => {
    // Make sure both Company and individual are filled
    await userEvent.click(await screen.findByRole("switch"));
    await userEvent.type(await screen.findByPlaceholderText<HTMLInputElement>("Company name"), "Company Name");
    await userEvent.click(await screen.findByRole("switch"));

    // Make sure all of ETH address, Bank wire and ENS are filled
    await screen.findByDisplayValue(INVALID_ETHEREUM_ADDRESS);
    await userEvent.clear(await screen.findByPlaceholderText<HTMLInputElement>("ETH address or ENS name"));
    await userEvent.click(await screen.findByText("Bank wire"));
    await userEvent.type(await screen.findByPlaceholderText<HTMLInputElement>("IBAN"), "FR7610107001011234567890129");
    await userEvent.type(await screen.findByPlaceholderText<HTMLInputElement>("BIC"), "BNPCFR21");
    await userEvent.click(await screen.findByText("Crypto wire"));
    await userEvent.type(await screen.findByPlaceholderText<HTMLInputElement>("ETH address or ENS name"), VALID_ENS);
    await screen.findByDisplayValue(VALID_ENS);

    // Submit the form, the mock query will take care of checking only relevant values are sent
    await userEvent.click(await screen.findByTestId("profile-form-submit-button"));
    await waitFor(() => {
      expect(updateUserMock.newData).toHaveBeenCalledOnce();
      expect(screen.getByTestId("toaster-message")).toBeVisible();
    });
  });
});

describe('"Profile" page for company', () => {
  const profileQueryMock = buildMockProfileQuery(mockCompany);
  const updateUserMock = buildMockMutationUpdateUser(mockCompany);

  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(accessToken(mockCompany.userId)));
  });

  beforeEach(() => {
    renderWithIntl(<ProfilePage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [profileQueryMock, updateUserMock],
      }),
    });
    vi.clearAllMocks();
  });

  it("should trigger the update upon form submit", async () => {
    await userEvent.click(await screen.findByTestId("profile-form-submit-button"));
    await waitFor(() => {
      expect(updateUserMock.newData).toHaveBeenCalledOnce();
    });
  });

  it("should not trigger the update upon cancel", async () => {
    await userEvent.click(await screen.findByTestId("profile-form-cancel-button"));
    await waitFor(() => {
      expect(updateUserMock.newData).not.toHaveBeenCalled();
    });
  });
});
