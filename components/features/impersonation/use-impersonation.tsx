import { useContext } from "react";

import { ImpersonationContext } from "./impersonation.provider";

export const useImpersonation = () => {
  const context = useContext(ImpersonationContext);
  if (context === undefined) {
    throw new Error("useImpersonation must be used within an ImpersonationProvider");
  }
  return context;
};
