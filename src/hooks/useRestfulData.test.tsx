import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRestfulData } from "./useRestfulData"; // Adjust the import path
import React from "react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: "mockData" }),
  })
) as jest.Mock<Promise<Response>>;

// Create a client
const queryClient = new QueryClient();

interface WrapperProps {
  children: React.ReactNode;
}

describe("useRestfulData", () => {
  it("should perform a GET request", async () => {
    (global.fetch as jest.Mock).mockClear();

    const wrapper: React.FC<WrapperProps> = ({ children }) => (
      <TokenSetProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </TokenSetProvider>
    );

    const { result, waitFor } = renderHook(
      () =>
        useRestfulData({
          resourcePath: "/test",
        }),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual({ data: "mockData" });

    expect(global.fetch).toHaveBeenCalledWith("https://undefined/test", {
      method: "GET",
      headers: {},
    });
  });

  it("should perform a DELETE request", async () => {
    (global.fetch as jest.Mock).mockClear();

    const wrapper: React.FC<WrapperProps> = ({ children }) => (
      <TokenSetProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </TokenSetProvider>
    );

    const { result, waitFor } = renderHook(
      () =>
        useRestfulData({
          resourcePath: "/test",
          method: "DELETE",
        }),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(global.fetch).toHaveBeenCalledWith("https://undefined/test", {
      method: "DELETE",
      headers: {},
    });
  });
});
