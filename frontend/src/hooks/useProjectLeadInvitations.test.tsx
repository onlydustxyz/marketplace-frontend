import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ACCEPT_PROJECT_LEADER_INVITATION_MUTATION, useProjectLeadInvitations } from "./useProjectLeadInvitations";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "./useTokenSet";
import { MemoryRouterProviderFactory } from "src/test/utils";
import { PENDING_PROJECT_LEADER_INVITATIONS_QUERY } from "src/graphql/queries";

const TEST_ACCESS_TOKEN = {
  user: {
    id: "test-user-id",
  },
  accessToken: "SOME_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
};

vi.mock("axios", () => ({
  default: {
    post: () => ({
      data: TEST_ACCESS_TOKEN,
    }),
  },
}));

const mocks = [
  {
    request: {
      query: PENDING_PROJECT_LEADER_INVITATIONS_QUERY,
      variables: {},
    },
    result: {
      data: {
        pendingProjectLeaderInvitations: [
          {
            id: "invitation-1",
            projectId: "project-1",
          },
          {
            id: "invitation-2",
            projectId: "project-2",
          },
        ],
      },
    },
  },
  {
    request: {
      query: ACCEPT_PROJECT_LEADER_INVITATION_MUTATION,
      variables: {
        invitationId: "invitation-1",
      },
    },
    result: {
      data: {
        acceptProjectLeaderInvitation: true,
      },
    },
  },
];

const renderWithProvider = () =>
  renderHook(() => useProjectLeadInvitations(), {
    wrapper: MemoryRouterProviderFactory({
      mocks,
    }),
  });

describe("useProjectLeadInvitations", () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(TEST_ACCESS_TOKEN));
  });

  it("should return all pending invitations of current user", async () => {
    const { result } = renderWithProvider();

    await waitFor(() => {
      expect(result.current.allInvitations).toEqual(mocks[0].result.data.pendingProjectLeaderInvitations);
    });
    expect(result.current.amIInvitedForProject("project-1")).toBe(true);
    expect(result.current.amIInvitedForProject("project-3")).toBe(false);
    expect(result.current.getInvitationForProject("project-1")).toEqual({ id: "invitation-1", projectId: "project-1" });
    expect(result.current.getInvitationForProject("project-3")).toBeUndefined();
  });

  it("should return allow accepting a pending invitation", async () => {
    const { result } = renderWithProvider();

    await result.current.acceptInvitation({
      variables: {
        invitationId: "invitation-1",
      },
    });

    await waitFor(() => {
      expect(result.current.acceptInvitationResponse.data).toEqual({ acceptProjectLeaderInvitation: true });
    });
  });
});
