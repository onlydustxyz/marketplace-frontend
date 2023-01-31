import { renderHook } from "@testing-library/react-hooks";
import useSignupRedirection, {
  PENDING_PROJECT_LEADER_INVITATIONS_QUERY,
  PENDING_USER_PAYMENTS_AND_PAYOUT_SETTINGS,
  User,
} from ".";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { RoutePaths } from "src/App";
import { generatePath } from "react-router-dom";
import { waitFor } from "@testing-library/react";

const render = (user: User, mocks?: ReadonlyArray<MockedResponse>) =>
  renderHook(() => useSignupRedirection(user), { wrapper: MockedProvider, initialProps: { mocks } });

const githubUserId = 123456789;
const userId = "user-id";
const projectId = "project-id";

const pendingProjectLeadInvitationMock = {
  request: {
    query: PENDING_PROJECT_LEADER_INVITATIONS_QUERY,
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
    },
  },
};

const pendingPaymentsMock = {
  request: {
    query: PENDING_USER_PAYMENTS_AND_PAYOUT_SETTINGS,
    variables: { userId },
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
        user: {
          userInfo: { payoutSettings: null },
          githubUser: {
            paymentRequests: [
              {
                amountInUsd: 100,
                paymentsAggregate: { aggregate: { sum: { amount: null } } },
              },
            ],
          },
        },
      },
    });

    const { result } = render({ userId }, [pendingPaymentsMock]);
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(mock).toBeCalledTimes(1);
      expect(result.current.url).toBe(RoutePaths.MyContributions);
    });
  });

  it("should return Projects if pending payments but payout settings are filled", async () => {
    const mock = pendingPaymentsMock.newData.mockReturnValue({
      data: {
        user: {
          userInfo: { payoutSettings: {} },
          githubUser: {
            paymentRequests: [
              {
                amountInUsd: 100,
                paymentsAggregate: { aggregate: { sum: { amount: null } } },
              },
            ],
          },
        },
      },
    });

    const { result } = render({ userId }, [pendingPaymentsMock]);
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(mock).toBeCalledTimes(1);
      expect(result.current.url).toBe(RoutePaths.Projects);
    });
  });

  it("should return Projects if no pending payments and no payout settings", async () => {
    const mock = pendingPaymentsMock.newData.mockReturnValue({
      data: {
        user: {
          userInfo: { payoutSettings: null },
          githubUser: {
            paymentRequests: [
              {
                amountInUsd: 100,
                paymentsAggregate: { aggregate: { sum: { amount: 100 } } },
              },
            ],
          },
        },
      },
    });

    const { result } = render({ userId }, [pendingPaymentsMock]);
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(mock).toBeCalledTimes(1);
      expect(result.current.url).toBe(RoutePaths.Projects);
    });
  });

  it("should return MyContributions if both invited and pending payments with no payout settings", async () => {
    const mock = pendingPaymentsMock.newData.mockReturnValue({
      data: {
        user: {
          userInfo: { payoutSettings: null },
          githubUser: {
            paymentRequests: [
              {
                amountInUsd: 100,
                paymentsAggregate: { aggregate: { sum: { amount: null } } },
              },
            ],
          },
        },
      },
    });

    const { result } = render({ userId, githubUserId }, [pendingPaymentsMock, pendingProjectLeadInvitationMock]);
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(mock).toBeCalledTimes(1);
      expect(result.current.url).toBe(RoutePaths.MyContributions);
    });
  });
});
