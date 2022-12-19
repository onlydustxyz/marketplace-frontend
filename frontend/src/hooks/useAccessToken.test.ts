import { renderHook } from "@testing-library/react-hooks";
import { useAccessToken } from "src/hooks/useAccessToken";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useAuth";
import { describe, expect, it, beforeEach } from "vitest";

describe("useAccessToken", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should return undefined if no token stored", () => {
    const { result } = renderHook(() => useAccessToken());
    expect(result.current).toBeUndefined();
  });

  it("should  return the access token on first render if a token is stored", () => {
    const accessToken = "accessToken";
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify({ accessToken }));
    const { result } = renderHook(() => useAccessToken());
    expect(result.current).toBe(accessToken);
  });

  it("should return the access token at next render after token is stored", () => {
    const { result, rerender } = renderHook(() => useAccessToken());
    expect(result.current).toBeUndefined();

    const accessToken = "accessToken";
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify({ accessToken }));

    rerender();
    expect(result.current).toBe(accessToken);
  });
});
