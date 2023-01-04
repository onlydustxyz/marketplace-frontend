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
  UpdateProfileInfoMutationVariables,
  Location,
  UserInfo,
  IdentityType,
  PayoutSettingsType,
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
    number: "34",
    street: "rue Lakanal",
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
    number: "34",
    street: "rue Lakanal",
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
    number: "7",
    street: "big ben street",
    city: "London",
    country: "United Kingdom",
    post_code: "EC",
  },
  payoutSettings: {
    WireTransfer: {
      BIC: "CITTGB2LXXX",
      IBAN: "GB7611315000011234567890138",
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
        optCompany: { id: userInfo.identity.Company?.id, name: userInfo.identity.Company?.name },
        optPerson: null,
      };

  const location: Location = {
    number: userInfo.location.number,
    street: userInfo.location.street,
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
    result: { data: { updateProfileInfo: userInfo.userId } },
  };
};

describe('"Profile" page for individual', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(accessToken(mockUser.userId)));
  });

  beforeEach(() => {
    renderWithIntl(<ProfilePage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [
          buildMockProfileQuery(mockUser),
          buildMockMutationUpdateUser(mockUser),
          buildMockMutationUpdateUser(mockUserWithEns),
        ],
      }),
    });
  });

  it("should display error when required field missing", async () => {
    await userEvent.clear(await screen.findByLabelText<HTMLInputElement>("Email"));
    await userEvent.clear(await screen.findByLabelText<HTMLInputElement>("First name"));
    expect((await screen.findByLabelText<HTMLInputElement>("Email")).value).toBe("");
    await userEvent.click(await screen.findByText("Save profile"));
    await waitFor(() => {
      const errorMessages = screen.getAllByText("Required");
      expect(errorMessages.length).toBe(2);
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

    await screen.findByDisplayValue(INVALID_ETHEREUM_ADDRESS);
    await userEvent.clear(await screen.findByPlaceholderText<HTMLInputElement>("Ethereum wallet address"));
    await userEvent.type(
      await screen.findByPlaceholderText<HTMLInputElement>("Ethereum wallet address"),
      VALID_ETHEREUM_ADDRESS
    );
    await screen.findByDisplayValue(VALID_ETHEREUM_ADDRESS);
    await userEvent.click(await screen.findByText("Save profile"));
    await screen.findByText("Success !");
  });

  it("should send only relevant values to the backend", async () => {
    // Make sure both Company and individual are filled
    await userEvent.click(await screen.findByText("Company"));
    await userEvent.type(await screen.findByPlaceholderText<HTMLInputElement>("ID"), "Company ID");
    await userEvent.type(await screen.findByPlaceholderText<HTMLInputElement>("Name"), "Company Name");
    await userEvent.click(await screen.findByText("Individual"));

    // Make sure all of ETH address, Bank wire and ENS are filled
    await screen.findByDisplayValue(INVALID_ETHEREUM_ADDRESS);
    await userEvent.click(await screen.findByText("Bank wire"));
    await userEvent.type(await screen.findByPlaceholderText<HTMLInputElement>("IBAN"), "GB7611315000011234567890138");
    await userEvent.type(await screen.findByPlaceholderText<HTMLInputElement>("BIC"), "CITTGB2LXXX");
    await userEvent.click(await screen.findByText("ENS domain"));
    await userEvent.type(await screen.findByPlaceholderText<HTMLInputElement>("ENS domain"), VALID_ENS);
    await screen.findByDisplayValue(VALID_ENS);

    // Submit the form, the mock query will take care of checking only relevant values are sent
    await userEvent.click(await screen.findByText("Save profile"));
    await screen.findByText("Success !");
  });
});

describe('"Profile" page for company', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(accessToken(mockCompany.userId)));
  });

  beforeEach(() => {
    renderWithIntl(<ProfilePage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [buildMockProfileQuery(mockCompany), buildMockMutationUpdateUser(mockCompany)],
      }),
    });
  });

  it("should display error when required field missing", async () => {
    await userEvent.clear(await screen.findByLabelText<HTMLInputElement>("Name"));
    expect((await screen.findByLabelText<HTMLInputElement>("Name")).value).toBe("");
    await userEvent.click(await screen.findByText("Save profile"));
    await waitFor(() => {
      const errorMessages = screen.getAllByText("Required");
      expect(errorMessages.length).toBe(1);
    });
  });

  it("should navigate to projects screen on success", async () => {
    // This triggers an error message 'Missing field updateUser'. The related issue on Apollo: https://github.com/apollographql/apollo-client/issues/8677
    await userEvent.click(await screen.findByText("Save profile"));
    await waitFor(() => {
      const successMessage = screen.getByText("Success !");
      expect(successMessage).toBeInTheDocument();
    });
  });
});
