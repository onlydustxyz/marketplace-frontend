import { act, renderHook } from "@testing-library/react-hooks";
import {
  accessTokenValidityDelay,
  LOCAL_STORAGE_TOKEN_SET_KEY,
  TokenSetProvider,
  useTokenSet,
} from "src/hooks/useTokenSet";
import { RefreshToken, TokenSet } from "src/types";
import { describe, expect, it, beforeEach, afterEach, vi, Mock } from "vitest";
import axios from "axios";
import config from "src/config";

const renderWithProvider = () => renderHook(() => useTokenSet(), { wrapper: TokenSetProvider });
const setTokenSet = (tokenSet: unknown) =>
  window.localStorage.setItem(LOCAL_STORAGE_TOKEN_SET_KEY, JSON.stringify(tokenSet));

vi.mock("axios");

describe("useTokenSet", () => {
  const accessToken = "accessToken";
  const refreshToken = "refreshToken";

  beforeEach(() => {
    window.localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return no token if no token stored", () => {
    const { result } = renderWithProvider();
    expect(result.current.tokenSet).toBeUndefined();
  });

  it("should return the token set on first render if a token is stored", () => {
    setTokenSet({ accessToken });
    const { result } = renderWithProvider();
    expect(result.current.tokenSet).toEqual({ accessToken });
  });

  it("should return the access token at next render after token is stored", () => {
    const { result, rerender } = renderWithProvider();
    expect(result.current.tokenSet).toBeUndefined();

    act(() => {
      result.current.setTokenSet({ accessToken } as TokenSet);
    });

    rerender();
    expect(result.current.tokenSet).toEqual({ accessToken });
  });

  it("should refresh the token if access token from local storage is expired", async () => {
    const updatedAccessToken = "updatedAccessToken";
    const creationDate = new Date(2000, 1, 1, 13, 0, 0);
    const currentDate = new Date(2000, 1, 1, 13, 2, 30);

    const tokenSet = {
      creationDate: creationDate.getTime(),
      accessTokenExpiresIn: 90,
      accessToken,
      refreshToken,
    } as unknown as TokenSet;
    vi.setSystemTime(currentDate);
    setTokenSet(tokenSet);
    (axios.post as Mock).mockResolvedValue({ data: { ...tokenSet, accessToken: updatedAccessToken } });

    const { result, waitForValueToChange } = renderWithProvider();
    expect(axios.post).toHaveBeenCalledOnce();

    await waitForValueToChange(() => result.current.tokenSet);
    expect(result.current.tokenSet?.accessToken).toEqual(updatedAccessToken);
  });

  describe("setTokenSet", () => {
    it("should store the token in localStorage", () => {
      const { result } = renderWithProvider();
      act(() => {
        result.current.setTokenSet({ accessToken } as TokenSet);
      });
      expect(window.localStorage.getItem(LOCAL_STORAGE_TOKEN_SET_KEY)).toEqual(JSON.stringify({ accessToken }));
    });
  });

  describe("clearTokenSet", () => {
    it("should remove the token from localStorage", () => {
      setTokenSet({ accessToken });

      const { result } = renderWithProvider();
      act(() => {
        result.current.clearTokenSet();
      });
      expect(window.localStorage.getItem(LOCAL_STORAGE_TOKEN_SET_KEY)).toBe("null");
    });
  });

  describe("setFromRefreshToken", () => {
    it("should exchange the refresh token with a token set", async () => {
      const tokenSet = { accessToken } as TokenSet;
      const date = new Date(2000, 1, 1, 13);
      vi.setSystemTime(date);

      (axios.post as Mock).mockResolvedValue({ data: tokenSet });
      const { result } = renderWithProvider();

      await act(async () => {
        await result.current.setFromRefreshToken(refreshToken as RefreshToken);
      });

      expect(axios.post).toHaveBeenCalledWith(`${config.HASURA_AUTH_BASE_URL}/token`, { refreshToken });

      expect(result.current.tokenSet).toEqual({ ...tokenSet, creationDate: date.getTime() });
    });
  });

  describe("tokenValidityDelay", () => {
    it("should compute the delay until access token expiration", () => {
      const creationDate = new Date(2000, 1, 1, 13, 0, 0);
      const currentDate = new Date(2000, 1, 1, 13, 0, 30);

      const tokenSet = { creationDate: creationDate.getTime(), accessTokenExpiresIn: 90 } as unknown as TokenSet;
      vi.setSystemTime(currentDate);

      const validityDelay = accessTokenValidityDelay(tokenSet);
      expect(validityDelay).toBe(30 * 1000); // 90 - 30 - 30 = 30
    });
  });
});
