import { MockedProvider } from "@apollo/client/testing";
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useFindGithubUser, { FIND_USER_QUERY } from ".";

const GITHUB_USER_LOGIN = "github-user-login";
const GITHUB_USER_ID = 12346587;

const findUserQueryMock = {
  request: {
    query: FIND_USER_QUERY,
    variables: { username: GITHUB_USER_LOGIN },
  },
  result: {
    data: {
      fetchUserDetails: {
        id: GITHUB_USER_ID,
      },
    },
  },
};

const render = () =>
  renderHook(() => useFindGithubUser(), {
    wrapper: MockedProvider,
    initialProps: { mocks: [findUserQueryMock] },
  });

describe("useIsGithubLoginValid", () => {
  it("should trigger query when requested", async () => {
    const { result } = render();

    result.current.trigger(GITHUB_USER_LOGIN);
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.userId).toBe(GITHUB_USER_ID);
    });
  });
});
