import { renderHook } from "@testing-library/react-hooks";
import jwtDecode from "jwt-decode";
import { useRoles } from "src/hooks/useAuth/useRoles";
import { AccessToken, CLAIMS_KEY, CustomUserRole, HasuraUserRole, PROJECTS_LED_KEY } from "src/types";
import { describe, expect, it, Mock, vi, beforeEach } from "vitest";

vi.mock("jwt-decode");

describe("useRoles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return Public role when no token is provided", () => {
    const { result } = renderHook(() => useRoles());
    expect(result.current.roles).toEqual([HasuraUserRole.Public]);
  });

  it("should return Registered role when a token is provided", () => {
    const jwtString = "some-token" as AccessToken;
    const jwt = {
      [CLAIMS_KEY]: {},
    };
    (jwtDecode as Mock).mockReturnValue(jwt);
    const { result } = renderHook(() => useRoles(jwtString));
    expect(result.current.roles).toEqual([HasuraUserRole.Public, HasuraUserRole.RegisteredUser]);
  });

  it("should process a project lead token", () => {
    const project1 = "project-1";
    const jwtString = "some-token" as AccessToken;
    const jwt = {
      [CLAIMS_KEY]: {
        [PROJECTS_LED_KEY]: `{"${project1}"}`,
      },
    };
    (jwtDecode as Mock).mockReturnValue(jwt);
    const { result } = renderHook(() => useRoles(jwtString));
    expect(result.current.roles).toEqual([
      HasuraUserRole.Public,
      HasuraUserRole.RegisteredUser,
      CustomUserRole.ProjectLead,
    ]);
    expect(result.current.ledProjectIds).toEqual([project1]);
  });

  it("should update role list when access token is given", () => {
    const { result, rerender } = renderHook((accessToken?: AccessToken) => useRoles(accessToken));
    expect(result.current.roles).toEqual([HasuraUserRole.Public]);

    const jwtString = "some-token" as AccessToken;
    const jwt = {
      [CLAIMS_KEY]: {},
    };
    (jwtDecode as Mock).mockReturnValue(jwt);
    rerender(jwtString);

    expect(result.current.roles).toEqual([HasuraUserRole.Public, HasuraUserRole.RegisteredUser]);
  });

  it("should update the loggedIn flag when a token is given", () => {
    const { result, rerender } = renderHook((accessToken?: AccessToken) => useRoles(accessToken));
    expect(result.current.isLoggedIn).toBeFalsy();

    const jwtString = "some-token" as AccessToken;
    rerender(jwtString);

    expect(result.current.isLoggedIn).toBeTruthy();
  });
});
