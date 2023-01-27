import { renderHook, waitFor } from "@testing-library/react";
import { ToasterProvider, useShowToaster, useToaster } from ".";

const renderWithProvider = () =>
  renderHook(() => ({ showToaster: useShowToaster(), toaster: useToaster() }), { wrapper: ToasterProvider });

describe("Toaster component", () => {
  it("should be visible for a given period of time", async () => {
    const { result } = renderWithProvider();

    expect(result.current.toaster.visible).toBe(false);
    result.current.showToaster("Message", { duration: 100 });
    await waitFor(() => expect(result.current.toaster.visible).toBe(true));

    await waitFor(() => expect(result.current.toaster.visible).toBe(false), { timeout: 105 });
  });
});
