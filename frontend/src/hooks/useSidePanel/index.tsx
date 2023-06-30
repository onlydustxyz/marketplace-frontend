import { createContext, PropsWithChildren, useContext, useState } from "react";
import FullTermsAndConditionsSidePanel from "src/pages/TermsAndConditions/FullTermsAndConditionsSidePanel";
import PrivacyPolicySidePanel from "src/pages/TermsAndConditions/PrivacyPolicySidePanel";

type SidePanel = {
  openFullTermsAndConditions: () => void;
  openPrivacyPolicy: () => void;
};

const SidePanelContext = createContext<SidePanel | null>(null);

export function SidePanelProvider({ children }: PropsWithChildren) {
  const [showFullTermsAndConditions, setShowFullTermsAndConditions] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  return (
    <SidePanelContext.Provider
      value={{
        openFullTermsAndConditions: () => setShowFullTermsAndConditions(true),
        openPrivacyPolicy: () => setShowPrivacyPolicy(true),
      }}
    >
      {children}
      <FullTermsAndConditionsSidePanel {...{ showFullTermsAndConditions, setShowFullTermsAndConditions }} />
      <PrivacyPolicySidePanel {...{ showPrivacyPolicy, setShowPrivacyPolicy }} />
    </SidePanelContext.Provider>
  );
}

export const useSidePanel = (): SidePanel => {
  const context = useContext(SidePanelContext);
  if (!context) {
    throw new Error("useSidePanel must be used within an SidePanelProvider");
  }
  return context;
};
