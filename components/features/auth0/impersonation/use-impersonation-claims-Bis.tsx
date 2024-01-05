import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useLocalStorage } from "react-use";

export const LOCAL_STORAGE_IMPERSONATION_SET_KEY = "impersonation_set";

export type ImpersonationClaimsContextType = {
  impersonationSet?: ImpersonationClaims;
  setImpersonationSet: (impersonationSet: ImpersonationClaims) => void;
  setCustomClaims: (customClaims: ImpersonationClaims) => void;
  clearImpersonationSet: () => void;
  getImpersonationHeaders: () => Partial<{
    "X-Impersonation-Claims": string;
  }>;
};

type ImpersonationClaims = {
  sub?: string;
};

export const ImpersonationClaimsContext = createContext<ImpersonationClaimsContextType | null>(null);

export const ImpersonationClaimsProvider = ({ children }: PropsWithChildren) => {
  const [impersonationSet, setImpersonationSet, clearImpersonationSet] = useLocalStorage<ImpersonationClaims>(
    LOCAL_STORAGE_IMPERSONATION_SET_KEY
  );
  const [customClaims, doSetCustomClaims] = useState<ImpersonationClaims>({});

  const setCustomClaims = (newClaims: ImpersonationClaims) => {
    const isNewValueDeeplyEqualToPrevious = JSON.stringify(newClaims) === JSON.stringify(customClaims);
    if (isNewValueDeeplyEqualToPrevious) {
      return;
    }
    doSetCustomClaims(newClaims);
  };

  const getImpersonationHeaders = () => {
    const impersonationClaims = impersonationSet
      ? {
          "X-Impersonation-Claims": `github|${impersonationSet.sub}`,
        }
      : undefined;

    return impersonationSet && impersonationClaims ? JSON.stringify(impersonationClaims) : {};
  };

  const value = {
    impersonationSet,
    setImpersonationSet,
    clearImpersonationSet,
    setCustomClaims,
    getImpersonationHeaders,
  };

  return <ImpersonationClaimsContext.Provider value={value}>{children}</ImpersonationClaimsContext.Provider>;
};

export const useImpersonationClaims = (): ImpersonationClaimsContextType => {
  const context = useContext(ImpersonationClaimsContext);
  if (!context) {
    throw new Error("useImpersonationClaims must be used within an ImpersonationClaimsProvider");
  }
  return context;
};
