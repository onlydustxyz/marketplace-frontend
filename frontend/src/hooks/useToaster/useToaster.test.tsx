import { renderHook, waitFor } from "@testing-library/react";
import { ToasterProvider, useToaster } from "./useToaster";

const renderWithProvider = () => renderHook(() => useToaster(), { wrapper: ToasterProvider });

describe("Toaster component", () => {
  it("should be visible for a given period of time", async () => {
    const { result } = renderWithProvider();

    expect(result.current.message).toBeUndefined();
    result.current.showToaster("Message", { duration: 100 });
    await waitFor(() => expect(result.current.message).toBe("Message"));

    await waitFor(() => expect(result.current.message).toBeUndefined, { timeout: 105 });
  });
});
