import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { useAuth, LOCAL_STORAGE_HASURA_TOKEN_KEY } from "./useAuth";
import { MemoryRouterProviderFactory } from "src/test/utils";
import hasuraToken from "src/test/fixtures/hasuraToken.json";

const REFRESHED_TOKEN = { ...hasuraToken, accessToken: "1234" };

vi.mock("axios", () => ({
  default: {
    post: () => ({ data: REFRESHED_TOKEN }),
  },
}));

describe("getToken", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("should return null if no token stored", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: MemoryRouterProviderFactory({ route: "" }) });
    expect(result.current.hasuraToken).toEqual(null);
  });

  it("should return token if up to date token is set", async () => {
    const token = { ...hasuraToken, creationDate: Date.now() };
    window.localStorage.setItem(LOCAL_STORAGE_HASURA_TOKEN_KEY, JSON.stringify(token));
    const { result, waitFor } = renderHook(() => useAuth(), { wrapper: MemoryRouterProviderFactory({ route: "" }) });
    await waitFor(() => expect(result.current.hasuraToken).toEqual(token));
  });
});
