import { ComponentProps, createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import SidePanel from "src/components/SidePanel";
import RewardSidePanel from "src/components/UserRewardTable/RewardSidePanel";

type RewardDetailProps = ComponentProps<typeof RewardSidePanel>;

type RewardDetailPanel = {
  open: (props: RewardDetailProps) => void;
  close: () => void;
};

const RewardDetailPanelContext = createContext<RewardDetailPanel | null>(null);

export function RewardDetailPanelProvider({ children }: PropsWithChildren) {
  const [rewardDetailProps, setRewardDetailProps] = useState<RewardDetailProps>();
  const [open, setOpen] = useState(false);

  const openSidePanel = useCallback((props: RewardDetailProps) => {
    setRewardDetailProps(props);
    setOpen(true);
  }, []);

  const closeSidePanel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <RewardDetailPanelContext.Provider value={{ open: openSidePanel, close: closeSidePanel }}>
      {children}
      <SidePanel open={open} setOpen={setOpen}>
        {rewardDetailProps?.rewardId ? <RewardSidePanel {...rewardDetailProps} /> : null}
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
