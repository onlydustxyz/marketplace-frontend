import React, { PropsWithChildren, useCallback } from "react";
import { useLocalStorage } from "react-use";

type ImpersonateClaim = {
  sub: string;
};

type ImpersonationContextType = {
  setImpersonateClaim: (claim: ImpersonateClaim) => void;
  getImpersonateClaim: () => ImpersonateClaim | undefined;
  clearImpersonateClaim: () => void;
  getImpersonateHeaders: () => Record<string, string> | undefined;
  isImpersonating: boolean;
};

export const ImpersonationContext = React.createContext<ImpersonationContextType | undefined>(undefined);

const ImpersonationProvider = ({ children }: PropsWithChildren) => {
  const [impersonateClaim, setImpersonateClaim, removeImpersonateClaim] =
    useLocalStorage<ImpersonateClaim>("impersonateClaim");

  const handleSetImpersonateClaim = (claim: ImpersonateClaim) => {
    setImpersonateClaim(claim);
  };

  const handleGetImpersonateClaim = () => {
    return impersonateClaim;
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

  const isImpersonating = !!impersonateClaim;

  const value = {
    setImpersonateClaim: handleSetImpersonateClaim,
    getImpersonateClaim: handleGetImpersonateClaim,
    clearImpersonateClaim: handleClearImpersonateClaim,
    getImpersonateHeaders: handleGetImpersonateHeaders,
    isImpersonating,
  };

  return <ImpersonationContext.Provider value={value}>{children}</ImpersonationContext.Provider>;
};

export default ImpersonationProvider;
