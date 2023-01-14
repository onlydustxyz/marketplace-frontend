import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it, beforeEach } from "vitest";
import { LOCAL_STORAGE_SESSION_KEY, SessionProvider, useSession } from "./useSession";

const renderWithProvider = () => renderHook(() => useSession(), { wrapper: SessionProvider });
const setSession = (session: unknown) =>
  window.localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));

describe("useSession", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should return no last visited project ID if not stored", () => {
    const { result } = renderWithProvider();
    expect(result.current.lastVisitedProjectId()).toBeUndefined();
  });

  it("should return the last visited project ID if stored", () => {
    const lastVisitedProjectId = "test-project-id";
    setSession({ lastVisitedProjectId });
    const { result } = renderWithProvider();
    expect(result.current.lastVisitedProjectId()).toEqual(lastVisitedProjectId);
  });

  it("should store the last visited project ID when called", () => {
    const lastVisitedProjectId = "test-project-id";
    const { result } = renderWithProvider();
    result.current.setLastVisitedProjectId(lastVisitedProjectId);
    expect(result.current.lastVisitedProjectId()).toEqual(lastVisitedProjectId);
  });
});
