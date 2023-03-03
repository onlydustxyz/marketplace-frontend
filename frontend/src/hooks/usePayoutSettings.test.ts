import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { UserPayoutSettingsFragment } from "src/__generated/graphql";
import usePayoutSettings, { GET_USER_PAYOUT_SETTINGS } from "./usePayoutSettings";

const GITHUB_USER_ID = 12345;

const render = (mocks: MockedResponse[]) =>
  renderHook(() => usePayoutSettings(GITHUB_USER_ID), { wrapper: MockedProvider, initialProps: { mocks } });

const mockGetPayoutSettingsQuery = <T>(payoutSettings: T, arePayoutSettingsValid: boolean) => ({
  request: {
    query: GET_USER_PAYOUT_SETTINGS,
    variables: { githubUserId: GITHUB_USER_ID },
  },
  result: {
    data: {
      authGithubUsers: [
        {
          user: {
            userInfo: {
              __typename: "UserInfo",
              payoutSettings,
              arePayoutSettingsValid,
            } as UserPayoutSettingsFragment,
          },
        },
      ],
    },
  },
});

export type PayoutSettings = {
  EthTransfer?: {
    Address?: string;
    Name?: string;
  };
  WireTransfer?: {
    IBAN?: string;
    BIC?: string;
  };
};

describe("usePayoutSettings", () => {
  test.each([
    [{ EthTransfer: { Address: "0xdef735b26faf007d34c5161581bbdcb3844c92e6b35e66e457dfd04742021127" } }, true],
    [{ EthTransfer: { Name: "vitalik.eth" } }, true],
    [{ WireTransfer: { IBAN: "FR0614508000708483648722R33", BIC: "AGFBFRCC" } }, true],
    [{}, false],
    [null, false],
    [{ EthTransfer: {} }, false],
    [{ EthTransfer: { Name: null } }, false],
    [{ EthTransfer: { Address: null } }, false],
    [{ WireTransfer: {} }, false],
    [{ WireTransfer: { IBAN: null, BIC: null } }, false],
    [{ WireTransfer: { IBAN: null, BIC: "AGFBFRCC" } }, false],
    [{ WireTransfer: { IBAN: "FR0614508000708483648722R33", BIC: null } }, false],
  ])("should return payout settings and their validity", async (payoutSettings, arePayoutSettingsValid) => {
    const { result } = render([mockGetPayoutSettingsQuery(payoutSettings, arePayoutSettingsValid)]);
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.valid).toBe(arePayoutSettingsValid);
    expect(result.current.data).toEqual(payoutSettings);
  });
});
