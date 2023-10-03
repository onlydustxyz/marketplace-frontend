import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import SidePanel from "src/components/SidePanel";
import { RewardDetail } from "src/components/RewardDetail/RewardDetail";

type RewardDetailPanel = {
  open: (githubUserId: number) => void;
};

const RewardDetailPanelContext = createContext<RewardDetailPanel | null>(null);

export function RewardDetailPanelProvider({ children }: PropsWithChildren) {
  const [githubUserId, setGithubUserId] = useState<number>();
  const [open, setOpen] = useState(false);

  const openSidePanel = useCallback((githubUserId: number) => {
    setGithubUserId(githubUserId);
    setOpen(true);
  }, []);

  return (
    <RewardDetailPanelContext.Provider value={{ open: openSidePanel }}>
      {children}
      <SidePanel open={open} setOpen={setOpen}>
        {githubUserId && <RewardDetail githubUserId={githubUserId} />}
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
