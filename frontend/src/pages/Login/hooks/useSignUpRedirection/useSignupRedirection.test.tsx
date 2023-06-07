import { renderHook } from "@testing-library/react-hooks";
import useSignupRedirection, { User } from ".";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { RoutePaths } from "src/App";
import { generatePath } from "react-router-dom";
import { waitFor } from "@testing-library/react";
import {
  GetUserPayoutSettingsDocument,
  GetUserPayoutSettingsQueryResult,
  PendingProjectLeaderInvitationsDocument,
  PendingProjectLeaderInvitationsQueryResult,
  PendingUserPaymentsDocument,
  PendingUserPaymentsQueryResult,
  UserPayoutSettingsFragment,
} from "src/__generated/graphql";
import { ToasterProvider } from "src/hooks/useToaster";
import { PropsWithChildren } from "react";

type WrapperProps = {
  mocks?: ReadonlyArray<MockedResponse>;
} & PropsWithChildren;

const wrapper = ({ children, mocks }: WrapperProps) => (
  <ToasterProvider>
    <MockedProvider mocks={mocks}>{children}</MockedProvider>
  </ToasterProvider>
);

const render = (user: User, mocks?: ReadonlyArray<MockedResponse>) =>
  renderHook(() => useSignupRedirection(user), { wrapper, initialProps: { mocks } });

const githubUserId = 123456789;
const userId = "user-id";
const projectId = "project-id";

const pendingProjectLeadInvitationMock = {
  request: {
    query: PendingProjectLeaderInvitationsDocument,
    variables: { githubUserId },
  },
  result: {
    data: {
      pendingProjectLeaderInvitations: [
        {
          id: "invitation-id",
          projectId,
        },
      ],
    } as PendingProjectLeaderInvitationsQueryResult["data"],
  },
};

const pendingPaymentsMock = {
  request: {
    query: PendingUserPaymentsDocument,
    variables: { userId },
  },
  newData: vi.fn(() => ({})),
};

const payoutSettingsMock = {
  request: {
    query: GetUserPayoutSettingsDocument,
    variables: { githubUserId },
  },
  newData: vi.fn(() => ({})),
};

describe("useSignupRedirection", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return Projects url by default", () => {
    const { result } = render({});
    expect(result.current.loading).toBe(false);
    expect(result.current.url).toBe(RoutePaths.Projects);
  });

  it("should return ProjectDetails if user is invited", async () => {
    const { result } = render({ githubUserId }, [pendingProjectLeadInvitationMock]);
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.url).toBe(generatePath(RoutePaths.ProjectDetails, { projectId })));
  });

  it("should return MyContributions if pending payments and no payout settings", async () => {
    const mock = pendingPaymentsMock.newData.mockReturnValue({
      data: {
        registeredUsers: [
          {
            paymentRequests: [
              {
                amountInUsd: 100,
                paymentsAggregate: { aggregate: { sum: { amount: null } } },
              },
            ],
          },
        ],
      } as PendingUserPaymentsQueryResult["data"],
    });

    payoutSettingsMock.newData.mockReturnValue({
      data: {
        registeredUsers: [
          {
            userInfo: {
              __typename: "UserInfo",
              payoutSettings: null,
              arePayoutSettingsValid: false,
            } as UserPayoutSettingsFragment,
          },
        ],
      } as GetUserPayoutSettingsQueryResult["data"],
    });

    const { result } = render({ userId, githubUserId }, [pendingPaymentsMock, payoutSettingsMock]);
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(mock).toBeCalledTimes(1);
      expect(result.current.url).toBe(RoutePaths.Payments);
    });
  });

  it("should return Projects if pending payments but payout settings are filled", async () => {
    const mock = pendingPaymentsMock.newData.mockReturnValue({
      data: {
        registeredUsers: [
          {
            paymentRequests: [
              {
                amountInUsd: 100,
                paymentsAggregate: { aggregate: { sum: { amount: null } } },
              },
            ],
          },
        ],
      } as PendingUserPaymentsQueryResult["data"],
    });

    payoutSettingsMock.newData.mockReturnValue({
      data: {
        registeredUsers: [
          {
            userInfo: {
              __typename: "UserInfo",
              payoutSettings: null,
              arePayoutSettingsValid: true,
            } as UserPayoutSettingsFragment,
          },
        ],
      } as GetUserPayoutSettingsQueryResult["data"],
    });

    const { result } = render({ userId, githubUserId }, [pendingPaymentsMock, payoutSettingsMock]);
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(mock).toBeCalledTimes(1);
      expect(result.current.url).toBe(RoutePaths.Projects);
    });
  });

  it("should return Projects if no pending payments and no payout settings", async () => {
    const mock = pendingPaymentsMock.newData.mockReturnValue({
      data: {
        registeredUsers: [
          {
            paymentRequests: [
              {
                amountInUsd: 100,
                paymentsAggregate: { aggregate: { sum: { amount: 100 } } },
              },
            ],
          },
        ],
      } as PendingUserPaymentsQueryResult["data"],
    });

    payoutSettingsMock.newData.mockReturnValue({
      data: {
        registeredUsers: [
          {
            userInfo: {
              __typename: "UserInfo",
              payoutSettings: null,
              arePayoutSettingsValid: false,
            } as UserPayoutSettingsFragment,
          },
        ],
      } as GetUserPayoutSettingsQueryResult["data"],
    });

    const { result } = render({ userId, githubUserId }, [pendingPaymentsMock, payoutSettingsMock]);
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(mock).toBeCalledTimes(1);
      expect(result.current.url).toBe(RoutePaths.Projects);
    });
  });

  it("should return MyContributions if both invited and pending payments with no payout settings", async () => {
    const mock = pendingPaymentsMock.newData.mockReturnValue({
      data: {
        registeredUsers: [
          {
            paymentRequests: [
              {
                amountInUsd: 100,
                paymentsAggregate: { aggregate: { sum: { amount: null } } },
              },
            ],
          },
        ],
      } as PendingUserPaymentsQueryResult["data"],
    });

    payoutSettingsMock.newData.mockReturnValue({
      data: {
        registeredUsers: [
          {
            userInfo: {
              __typename: "UserInfo",
              payoutSettings: null,
              arePayoutSettingsValid: false,
            } as UserPayoutSettingsFragment,
          },
        ],
      } as GetUserPayoutSettingsQueryResult["data"],
    });

    const { result } = render({ userId, githubUserId }, [
      pendingPaymentsMock,
      pendingProjectLeadInvitationMock,
      payoutSettingsMock,
    ]);
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(mock).toBeCalledTimes(1);
      expect(result.current.url).toBe(RoutePaths.Payments);
    });
  });
});
