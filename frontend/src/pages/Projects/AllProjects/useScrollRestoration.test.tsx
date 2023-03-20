import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import ScrollRestoration, { RESTORE_SCROLL_POSITION_KEY } from "./useScrollRestoration";
import { useLocation } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual: object = await vi.importActual("react-router-dom");
  return {
    ...actual,
    ...{ useLocation: vi.fn() },
  };
});

Object.defineProperty(window, "scrollTo", vi.fn());

describe("useScrollRestoration", () => {
  it("should not scroll if not asked", () => {
    (useLocation as Mock).mockReturnValue({ state: { [RESTORE_SCROLL_POSITION_KEY]: false } });
    render(<ScrollRestoration />, { wrapper: MemoryRouter });
    expect(window.scrollTo as Mock).not.toHaveBeenCalled();
  });

  it("should scroll if asked", () => {
    (useLocation as Mock).mockReturnValue({ state: { [RESTORE_SCROLL_POSITION_KEY]: true } });
    render(<ScrollRestoration />, { wrapper: MemoryRouter });
    expect(window.scrollTo as Mock).toHaveBeenCalled();
  });
});
