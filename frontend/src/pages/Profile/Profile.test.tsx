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
    EthTransfer: "0x1234567890",
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
        type: PayoutSettingsType.EthereumAddress,
        optEthAddress: userInfo.payoutSettings.EthTransfer,
        optBankAddress: null,
      }
    : {
        type: PayoutSettingsType.BankAddress,
        optBankAddress: {
          IBAN: userInfo.payoutSettings.WireTransfer?.IBAN,
          BIC: userInfo.payoutSettings.WireTransfer?.BIC,
        },
        optEthAddress: null,
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
        mocks: [buildMockProfileQuery(mockUser), buildMockMutationUpdateUser(mockUser)],
      }),
    });
  });

  it("should print form with default values", async () => {
    await screen.findByText("Edit profile");
    expect((await screen.findByLabelText<HTMLInputElement>("Firstname")).value).toBe(
      mockUser.identity.Person.firstname
    );
    expect((await screen.findByLabelText<HTMLInputElement>("Lastname")).value).toBe(mockUser.identity.Person.lastname);
    expect((await screen.findByLabelText<HTMLInputElement>("Email")).value).toBe(mockUser.email);
    expect((await screen.findByLabelText<HTMLInputElement>("N.")).value).toBe(mockUser.location.number);
    expect((await screen.findByLabelText<HTMLInputElement>("Street")).value).toBe(mockUser.location.street);
    expect((await screen.findByPlaceholderText<HTMLInputElement>("Postal code")).value).toBe(
      mockUser.location.post_code
    );
    expect((await screen.findByPlaceholderText<HTMLInputElement>("City")).value).toBe(mockUser.location.city);
    expect((await screen.findByPlaceholderText<HTMLInputElement>("Country")).value).toBe(mockUser.location.country);
    expect((await screen.findByPlaceholderText<HTMLInputElement>("Ethereum wallet address")).value).toBe(
      mockUser.payoutSettings.EthTransfer
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

  it("should print form with default values", async () => {
    await screen.findByText("Edit profile");
    expect((await screen.findByLabelText<HTMLInputElement>("ID")).value).toBe(mockCompany.identity.Company.id);
    expect((await screen.findByLabelText<HTMLInputElement>("Name")).value).toBe(mockCompany.identity.Company.name);
    expect((await screen.findByLabelText<HTMLInputElement>("Email")).value).toBe(mockCompany.email);
    expect((await screen.findByLabelText<HTMLInputElement>("N.")).value).toBe(mockCompany.location.number);
    expect((await screen.findByLabelText<HTMLInputElement>("Street")).value).toBe(mockCompany.location.street);
    expect((await screen.findByPlaceholderText<HTMLInputElement>("Postal code")).value).toBe(
      mockCompany.location.post_code
    );
    expect((await screen.findByPlaceholderText<HTMLInputElement>("City")).value).toBe(mockCompany.location.city);
    expect((await screen.findByPlaceholderText<HTMLInputElement>("Country")).value).toBe(mockCompany.location.country);
    expect((await screen.findByPlaceholderText<HTMLInputElement>("IBAN")).value).toBe(
      mockCompany.payoutSettings.WireTransfer.IBAN
    );
    expect((await screen.findByPlaceholderText<HTMLInputElement>("BIC")).value).toBe(
      mockCompany.payoutSettings.WireTransfer.BIC
    );
  });

  it("should display error when required field missing", async () => {
    await userEvent.clear(await screen.findByLabelText<HTMLInputElement>("Name"));
    expect((await screen.findByLabelText<HTMLInputElement>("Name")).value).toBe("");
    await userEvent.click(await screen.findByText("Send"));
    waitFor(() => {
      const errorMessages = screen.getAllByText("Required");
      expect(errorMessages.length).toBe(1);
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
