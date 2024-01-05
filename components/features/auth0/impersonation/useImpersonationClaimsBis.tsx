import { createContext, PropsWithChildren, useState } from "react";
import { useLocalStorage } from "react-use";

export const LOCAL_STORAGE_IMPERSONATION_SET_KEY = "impersonation_set";

export type ImpersonationClaimsContextType = {
  impersonationSet?: ImpersonationClaims;
  setImpersonationSet: (impersonationSet: ImpersonationClaims) => void;
  setCustomClaims: (customClaims: ImpersonationClaims) => void;
  clearImpersonationSet: () => void;
  getImpersonationHeaders: () => {
    "X-Impersonation-Claims": ImpersonationClaims;
  };
};

type ImpersonationClaims = {
  sub?: string;
};

export const ImpersonationClaimsContext = createContext<ImpersonationClaimsContextType | null>(null);

export const ImpersonationClaimsProvider = ({ children }: PropsWithChildren) => {
  const [impersonationSet, setImpersonationSet, clearImpersonationSet] = useLocalStorage<ImpersonationClaims>(
    LOCAL_STORAGE_IMPERSONATION_SET_KEY
  );
  const [customClaims, setCustomClaims] = useState<ImpersonationClaims>({});

  const setCustomClaims = (newClaims: ImpersonationClaims) => {
    const isNewValueDeeplyEqualToPrevious = JSON.stringify(newClaims) === JSON.stringify(customClaims);
    if (isNewValueDeeplyEqualToPrevious) {
      return;
    }
    setCustomClaims(newClaims);
  };
};
