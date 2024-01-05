import React, { PropsWithChildren, useCallback } from "react";
import { useLocalStorage } from "react-use";

type ImpersonateClaim = {
  sub: string;
};

type ImpersonationContextType = {
  setImpersonateClaim: (claim: ImpersonateClaim) => void;
  clearImpersonateClaim: () => void;
  getImpersonateHeaders: () => Record<string, string> | undefined;
};

export const ImpersonationContext = React.createContext<ImpersonationContextType | undefined>(undefined);

const ImpersonationProvider = ({ children }: PropsWithChildren) => {
  const [impersonateClaim, setImpersonateClaim, removeImpersonateClaim] =
    useLocalStorage<ImpersonateClaim>("impersonateClaim");

  const handleSetImpersonateClaim = (claim: ImpersonateClaim) => {
    setImpersonateClaim(claim);
  };

  const handleClearImpersonateClaim = () => {
    removeImpersonateClaim();
  };

  const handleGetImpersonateHeaders = useCallback(() => {
    if (impersonateClaim) {
      return { "X-Impersonation-Claims": JSON.stringify(impersonateClaim) };
    }
    return undefined;
  }, [impersonateClaim]);

  const value = {
    setImpersonateClaim: handleSetImpersonateClaim,
    clearImpersonateClaim: handleClearImpersonateClaim,
    getImpersonateHeaders: handleGetImpersonateHeaders,
  };

  return <ImpersonationContext.Provider value={value}>{children}</ImpersonationContext.Provider>;
};

export default ImpersonationProvider;
