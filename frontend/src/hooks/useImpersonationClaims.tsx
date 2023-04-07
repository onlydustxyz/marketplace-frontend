import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useLocalStorage } from "react-use";
import { ImpersonationSet } from "src/types";

export const LOCAL_STORAGE_IMPERSONATION_SET_KEY = "impersonation_set";

type ImpersonationClaimsContextType = {
  impersonationSet?: ImpersonationSet;
  setImpersonationSet: (impersonationSet: ImpersonationSet) => void;
  customClaims: CustomClaims;
  setCustomClaims: (customClaims: CustomClaims) => void;
  clearImpersonationSet: () => void;
};

type CustomClaims = {
  projectsLeaded?: string[];
  githubUserId?: number;
};

export const ImpersonationClaimsContext = createContext<ImpersonationClaimsContextType | null>(null);

export const ImpersonationClaimsProvider = ({ children }: PropsWithChildren) => {
  const [impersonationSet, setImpersonationSet, clearImpersonationSet] = useLocalStorage<ImpersonationSet>(
    LOCAL_STORAGE_IMPERSONATION_SET_KEY
  );
  const [customClaims, doSetCustomClaims] = useState<CustomClaims>({});

  const setCustomClaims = (newClaims: CustomClaims) => {
    const newValueIsDeeplyEqualToPrevious = JSON.stringify(newClaims) === JSON.stringify(customClaims);
    if (newValueIsDeeplyEqualToPrevious) {
      return;
    }
    doSetCustomClaims(newClaims);
  };

  const value = {
    impersonationSet,
    setImpersonationSet,
    clearImpersonationSet,
    customClaims,
    setCustomClaims,
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
