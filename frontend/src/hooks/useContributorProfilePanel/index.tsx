import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import ContributorProfileSidePanel from "./ContributorProfileSidePanel";

type ContributorProfilePanel = {
  open: (githubUserId: number) => void;
};

const ContributorProfilePanelContext = createContext<ContributorProfilePanel | null>(null);

export const ContributorProfilePanelProvider = ({ children }: PropsWithChildren) => {
  const [githubUserId, setGithubUserId] = useState<number>();
  const [open, setOpen] = useState(false);

  const openSidePanel = useCallback((githubUserId: number) => {
    setGithubUserId(githubUserId);
    setOpen(true);
  }, []);

  return (
    <ContributorProfilePanelContext.Provider value={{ open: openSidePanel }}>
      {children}
      {githubUserId && <ContributorProfileSidePanel githubUserId={githubUserId} open={open} setOpen={setOpen} />}
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
