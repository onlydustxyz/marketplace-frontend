import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import SidePanel from "src/components/SidePanel";
import { RewardDetail } from "src/components/RewardDetail/RewardDetail";

type RewardDetailPanel = {
  open: (githubUserId: number, contributionId: string) => void;
  close: () => void;
};

const RewardDetailPanelContext = createContext<RewardDetailPanel | null>(null);

export function RewardDetailPanelProvider({ children }: PropsWithChildren) {
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
    <RewardDetailPanelContext.Provider value={{ open: openSidePanel, close: closeSidePanel }}>
      {children}
      <SidePanel open={open} setOpen={setOpen}>
        {githubUserId && contributionId ? (
          <RewardDetail githubUserId={githubUserId} contributionId={contributionId} />
        ) : null}
      </SidePanel>
    </RewardDetailPanelContext.Provider>
  );
}

export function useRewardDetailPanel(): RewardDetailPanel {
  const context = useContext(RewardDetailPanelContext);

  if (!context) {
    throw new Error("useRewardDetailPanel must be used within a RewardDetailPanelContext provider");
  }

  return context;
}
