import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import SidePanel from "src/components/SidePanel";
import { ContributionDetail } from "src/components/ContributionDetail/ContributionDetail";

type ContributionDetailPanel = {
  open: (githubUserId: number, contributionId: string) => void;
  close: () => void;
};

const ContributionDetailPanelContext = createContext<ContributionDetailPanel | null>(null);

export function ContributionDetailPanelProvider({ children }: PropsWithChildren) {
  const [githubUserId, setGithubUserId] = useState<number>();
  const [contributionId, setContributionId] = useState<string>();
  const [open, setOpen] = useState(false);

  const openSidePanel = useCallback((githubUserId: number, contributionId: string) => {
    setGithubUserId(githubUserId);
    setContributionId(contributionId);
    setOpen(true);
  }, []);

  const closeSidePanel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <ContributionDetailPanelContext.Provider value={{ open: openSidePanel, close: closeSidePanel }}>
      {children}
      <SidePanel open={open} setOpen={setOpen}>
        {githubUserId && contributionId ? (
          <ContributionDetail githubUserId={githubUserId} contributionId={contributionId} />
        ) : null}
      </SidePanel>
    </ContributionDetailPanelContext.Provider>
  );
}

export function useContributionDetailPanel(): ContributionDetailPanel {
  const context = useContext(ContributionDetailPanelContext);

  if (!context) {
    throw new Error("useContributionDetailPanel must be used within a ContributionDetailPanelContext provider");
  }

  return context;
}
