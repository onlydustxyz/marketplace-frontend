"use client";

import { createContext, PropsWithChildren, useCallback } from "react";
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

export const ImpersonationContext = createContext<ImpersonationContextType | undefined>(undefined);

export function ImpersonationProvider({ children }: PropsWithChildren) {
  const [impersonateClaim, setImpersonateClaim, removeImpersonateClaim] =
    useLocalStorage<ImpersonateClaim>("impersonateClaim");

  const handleSetImpersonateClaim = (claim: ImpersonateClaim) => {
    if (claim.sub !== impersonateClaim?.sub) {
      setImpersonateClaim(claim);
    }
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

  const value = {
    setImpersonateClaim: handleSetImpersonateClaim,
    getImpersonateClaim: handleGetImpersonateClaim,
    clearImpersonateClaim: handleClearImpersonateClaim,
    getImpersonateHeaders: handleGetImpersonateHeaders,
    isImpersonating: !!impersonateClaim,
  };

  return <ImpersonationContext.Provider value={value}>{children}</ImpersonationContext.Provider>;
}
