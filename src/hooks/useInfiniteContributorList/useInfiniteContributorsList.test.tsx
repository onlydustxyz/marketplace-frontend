import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useInfiniteContributorList from "./useInfiniteContributorList";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import React from "react";
import { AuthProvider } from "src/hooks/useAuth";
import { BrowserRouter as Router } from "react-router-dom";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";
import { ToasterProvider } from "src/hooks/useToaster";
import ApolloWrapper from "src/providers/ApolloWrapper";

const contributors = [
  {
    githubUserId: 77244572,
    login: "0racl3z",
    avatarUrl: "https://avatars.githubusercontent.com/u/77244572?v=4",
    contributionCount: 1,
    rewardCount: 0,
    earned: null,
    contributionToRewardCount: null,
    pullRequestToReward: null,
    issueToReward: null,
    codeReviewToReward: null,
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ pages: [{ contributors: contributors }] }),
  })
) as jest.Mock<Promise<Response>>;

// Create a client
const queryClient = new QueryClient();

interface WrapperProps {
  children: React.ReactNode;
}

describe("useInfiniteContributorList", () => {
  it("should fetch contributors data", async () => {
    (global.fetch as jest.Mock).mockClear();

    const wrapper: React.FC<WrapperProps> = ({ children }) => (
      <Router>
        <ImpersonationClaimsProvider>
          <TokenSetProvider>
            <ToasterProvider>
              <ApolloWrapper>
                <AuthProvider>
                  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                </AuthProvider>
              </ApolloWrapper>
            </ToasterProvider>
          </TokenSetProvider>
        </ImpersonationClaimsProvider>
      </Router>
    );

    const { result, waitFor } = renderHook(() => useInfiniteContributorList({ projectId: "123" }), { wrapper });

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => expect(result.current.isFetching).toBe(false));

    const options = {
      method: "GET",
      headers: {},
    };

    expect(global.fetch).toHaveBeenCalledWith(
      "https://develop-api.onlydust.com/api/v1/projects/123/contributors?page_index=0&page_size=15",
      options
    );
  });
});
