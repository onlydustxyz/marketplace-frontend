import { createContext, PropsWithChildren, useCallback, useContext } from "react";
import { useStackContributorProfile } from "src/App/Stacks";

type ContributorProfilePanel = {
  open: (githubUserId: number) => void;
};

const ContributorProfilePanelContext = createContext<ContributorProfilePanel | null>(null);

export const ContributorProfilePanelProvider = ({ children }: PropsWithChildren) => {
  const [openProfilePanel] = useStackContributorProfile();

  const openSidePanel = useCallback((githubUserId: number) => {
    if (githubUserId) {
      openProfilePanel({ githubUserId });
    }
  }, []);

  return (
    <ContributorProfilePanelContext.Provider value={{ open: openSidePanel }}>
      {children}
    </ContributorProfilePanelContext.Provider>
  );
};

export const useContributorProfilePanel = (): ContributorProfilePanel => {
  const context = useContext(ContributorProfilePanelContext);
  if (!context) {
    throw new Error("useContributorProfilePanel must be used within an ContributorProfilePanelProvider");
  }
  return context;
};
