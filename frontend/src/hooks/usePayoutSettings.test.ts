import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import usePayoutSettings, { GET_USER_PAYOUT_SETTINGS } from "./usePayoutSettings";

const GITHUB_USER_ID = 12345;

const render = (mocks: MockedResponse[]) =>
  renderHook(() => usePayoutSettings(GITHUB_USER_ID), { wrapper: MockedProvider, initialProps: { mocks } });

const mockGetPayoutSettingsQuery = <T>(payoutSettings: T) => ({
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
              payoutSettings,
            },
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
    { EthTransfer: { Address: "0xdef735b26faf007d34c5161581bbdcb3844c92e6b35e66e457dfd04742021127" } },
    { EthTransfer: { Name: "vitalik.eth" } },
    { WireTransfer: { IBAN: "FR0614508000708483648722R33", BIC: "AGFBFRCC" } },
  ])("should return true if payout settings are valid", async payoutSettings => {
    const { result } = render([mockGetPayoutSettingsQuery(payoutSettings)]);
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.valid).toBe(true);
    expect(result.current.data).toEqual(payoutSettings);
  });

  test.each([
    {},
    null,
    "invalid",
    { EthTransfer: {} },
    { EthTransfer: { Name: null } },
    { EthTransfer: { Address: null } },
    { WireTransfer: {} },
    { WireTransfer: { IBAN: null, BIC: null } },
    { WireTransfer: { IBAN: null, BIC: "AGFBFRCC" } },
    { WireTransfer: { IBAN: "FR0614508000708483648722R33", BIC: null } },
  ])("should return false if payout settings are invalid", async payoutSettings => {
    const { result } = render([mockGetPayoutSettingsQuery(payoutSettings)]);
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.valid).toBe(false);
  });
});
