import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useLocalStorage } from "react-use";
import { ImpersonationSet } from "src/types";

export const LOCAL_STORAGE_IMPERSONATION_SET_KEY = "impersonation_set";

export type ImpersonationClaimsContextType = {
  impersonationSet?: ImpersonationSet;
  setImpersonationSet: (impersonationSet: ImpersonationSet) => void;
  setCustomClaims: (customClaims: CustomClaims) => void;
  clearImpersonationSet: () => void;
  getImpersonationHeaders: () => Partial<{
    "X-Hasura-Admin-Secret": string;
    "X-Hasura-Role": string;
    "X-Hasura-User-Id": string;
    "X-Hasura-projectsLeaded": string;
    "X-Hasura-githubUserId": string;
    "X-Impersonation-Claims": string;
  }>;
};

type CustomClaims = {
  projectsLeaded?: string[];
  githubUserId?: number;
  githubAccessToken?: string;
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

  const getImpersonationHeaders = () => {
    const impersonationClaims = impersonationSet
      ? {
          "x-hasura-user-id": impersonationSet.userId,
          "x-hasura-projectsLeaded": `{${customClaims.projectsLeaded?.map(id => `"${id}"`).join(",") || ""}}`,
          "x-hasura-githubUserId": `${customClaims.githubUserId || 0}`,
          "x-hasura-githubAccessToken": customClaims.githubAccessToken || "",
        }
      : undefined;

    return impersonationSet && impersonationClaims
      ? {
          // Impersonation for Hasura
          "X-Hasura-Admin-Secret": impersonationSet.password,
          "X-Hasura-Role": "registered_user",
          "X-Hasura-User-Id": impersonationClaims["x-hasura-user-id"],
          "X-Hasura-projectsLeaded": impersonationClaims["x-hasura-projectsLeaded"],
          "X-Hasura-githubUserId": impersonationClaims["x-hasura-githubUserId"],
          // Impersonation for OnlyDust API
          "X-Impersonation-Claims": JSON.stringify(impersonationClaims),
        }
      : {};
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
