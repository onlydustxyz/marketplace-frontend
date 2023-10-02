import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it, beforeEach } from "vitest";
import {
  LOCAL_STORAGE_SESSION_KEY,
  SessionMethod,
  SessionProvider,
  useSessionDispatch,
  useSession,
} from "./useSession";

const renderUseSession = () => renderHook(() => useSession(), { wrapper: SessionProvider });
const renderUseDispatchSession = () => renderHook(() => useSessionDispatch(), { wrapper: SessionProvider });

const setSession = (session: unknown) =>
  window.localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));

describe("useSession", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should return no last visited project ID if not stored", () => {
    const { result: useSession } = renderUseSession();

    expect(useSession.current.lastVisitedProjectId).toBeUndefined();
  });

  it("should return the last visited project ID if stored", () => {
    const lastVisitedProjectId = "test-project-id";
    setSession({ lastVisitedProjectId });
    const { result: useSession } = renderUseSession();
    expect(useSession.current.lastVisitedProjectId).toEqual(lastVisitedProjectId);
  });

  it("should store the last visited project ID when called", async () => {
    const lastVisitedProjectId = "test-project-id";
    const { result: useDispatchSession } = renderUseDispatchSession();
    useDispatchSession.current({ method: SessionMethod.SetLastVisitedProjectId, value: lastVisitedProjectId });

    const { result: useSession } = renderUseSession();
    await waitFor(() => {
      expect(useSession.current.lastVisitedProjectId).toEqual(lastVisitedProjectId);
      expect(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_SESSION_KEY) || "{}").lastVisitedProjectId).toEqual(
        lastVisitedProjectId
      );
    });
  });
});
