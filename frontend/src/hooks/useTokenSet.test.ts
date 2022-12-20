import { act, renderHook } from "@testing-library/react-hooks";
import { LOCAL_STORAGE_TOKEN_SET_KEY, TokenSetProvider, useTokenSet } from "src/hooks/useTokenSet";
import { TokenSet } from "src/types";
import { describe, expect, it, beforeEach } from "vitest";

const renderWithProvider = () => renderHook(() => useTokenSet(), { wrapper: TokenSetProvider });

describe("useTokenSet", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should return no token if no token stored", () => {
    const { result } = renderWithProvider();
    expect(result.current.tokenSet).toBeUndefined();
  });

  it("should return the token set on first render if a token is stored", () => {
    const accessToken = "accessToken";
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify({ accessToken }));
    const { result } = renderWithProvider();
    expect(result.current.tokenSet).toEqual({ accessToken });
  });

  it("should return the access token at next render after token is stored", () => {
    const { result, rerender } = renderWithProvider();
    expect(result.current.tokenSet).toBeUndefined();

    const accessToken = "accessToken";
    act(() => {
      result.current.setTokenSet({ accessToken } as TokenSet);
    });

    rerender();
    expect(result.current.tokenSet).toEqual({ accessToken });
  });
});
