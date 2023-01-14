import { createContext, PropsWithChildren, useContext } from "react";
import { useLocalStorage } from "react-use";
import { Session } from "src/types";

export const LOCAL_STORAGE_SESSION_KEY = "session";

type SessionContextType = {
  lastVisitedProjectId: () => string | undefined;
  setLastVisitedProjectId: (projectId: string) => void;
};

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useLocalStorage<Session | null>(LOCAL_STORAGE_SESSION_KEY);

  const setLastVisitedProjectId = (projectId: string) => {
    setSession({ ...session, lastVisitedProjectId: projectId });
  };

  const lastVisitedProjectId = () => {
    return session?.lastVisitedProjectId;
  };

  const value = {
    lastVisitedProjectId,
    setLastVisitedProjectId,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within an SessionProvider");
  }
  return context;
};
