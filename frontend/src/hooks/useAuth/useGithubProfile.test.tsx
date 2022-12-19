import { MockedProvider } from "@apollo/client/testing";
import { renderHook } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { GET_USER_GITHUB_ID, useGithubProfile } from "src/hooks/useAuth/useGithubProfile";
import { HasuraUserRole, UserRole } from "src/types";
import { describe, expect, it } from "vitest";

describe("useGithubProfile", () => {
  it("should not fetch the profile when the user is not registered, then fetch the github profile", async () => {
    const roles: UserRole[] = [HasuraUserRole.Public];
    const githubUserId = Symbol("githubUserId");
    const mocks = [
      {
        request: {
          query: GET_USER_GITHUB_ID,
        },
        result: {
          data: {
            authGithubUsers: [
              {
                githubUserId,
              },
            ],
          },
        },
      },
    ];
    const wrapper = ({ children }: PropsWithChildren) => <MockedProvider mocks={mocks}>{children}</MockedProvider>;

    const { result, rerender, waitForValueToChange } = renderHook<
      PropsWithChildren & { roles: UserRole[] },
      ReturnType<typeof useGithubProfile>
    >(({ roles }) => useGithubProfile(roles), {
      wrapper,
      initialProps: { roles },
    });

    expect(result.current.githubUserId).toBeUndefined();

    rerender({ roles: [HasuraUserRole.Public, HasuraUserRole.RegisteredUser] });
    await waitForValueToChange(() => result.current.githubUserId);

    expect(result.current.githubUserId).toBe(githubUserId);
  });
});
