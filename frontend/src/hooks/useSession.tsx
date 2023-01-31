import { createContext, PropsWithChildren, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";

export const LOCAL_STORAGE_SESSION_KEY = "session";

type Session = {
  lastVisitedProjectId?: string;
  lastLoginTime?: string;
  visitedPageBeforeLogin?: string;
};

export const SessionContext = createContext({});
export const SessionDispatchContext = createContext((action: Action) => {
  return;
});

export function SessionProvider({ children }: PropsWithChildren) {
  const [storage, setStorage] = useLocalStorage<Session>(LOCAL_STORAGE_SESSION_KEY);
  const [session, dispatch] = useReducer(reduce, storage || {});

  useEffect(() => setStorage(session), [session]);

  return (
    <SessionContext.Provider value={session}>
      <SessionDispatchContext.Provider value={dispatch}>{children}</SessionDispatchContext.Provider>
    </SessionContext.Provider>
  );
}

export const useSession = (): Session => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within an SessionProvider");
  }
  return context;
};

export const useSessionDispatch = () => {
  const context = useContext(SessionDispatchContext);
  if (!context) {
    throw new Error("useSessionDispatch must be used within an SessionProvider");
  }
  return context;
};

export enum SessionMethod {
  SetLastVisitedProjectId = "lastVisitedProjectId",
  SetLastLoginTime = "lastLoginTime",
  SetVisitedPageBeforeLogin = "visitedPageBeforeLogin",
}

type Action = {
  method: SessionMethod;
  value: string;
};

function reduce(state: Session, action: Action): Session {
  return { ...state, [action.method]: action.value };
}
