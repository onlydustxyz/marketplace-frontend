import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { useAuth } from ".";
import { MemoryRouterProviderFactory } from "src/test/utils";
import axios from "axios";
import config from "src/config";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("clearAuth", () => {
  it("should reset token to null", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: MemoryRouterProviderFactory({ route: "" }) });
    result.current.clearAuth();
    expect(result.current.tokenSet).toEqual(null);
  });

  it("should revoke token", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: MemoryRouterProviderFactory({ route: "" }) });
    result.current.clearAuth();
    expect(axios.post).toHaveBeenCalledWith(`${config.HASURA_AUTH_BASE_URL}/signout`, expect.anything());
  });
});
