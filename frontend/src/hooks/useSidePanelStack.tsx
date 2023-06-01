import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";

type SidePanelStack = {
  open: () => number;
  close: () => void;
  openPanelCount: number;
};

const SidePanelStackContext = createContext<SidePanelStack | null>(null);

export const SidePanelStackProvider = ({ children }: PropsWithChildren) => {
  const [openPanelCount, setOpenPanelCount] = useState(0);

  const open = useCallback(() => {
    const panelIndex = openPanelCount;
    setOpenPanelCount(c => c + 1);
    return panelIndex;
  }, [openPanelCount, setOpenPanelCount]);

  const close = useCallback(() => setOpenPanelCount(c => c - 1), [setOpenPanelCount]);

  return (
    <SidePanelStackContext.Provider
      value={{
        open,
        close,
        openPanelCount,
      }}
    >
      {children}
    </SidePanelStackContext.Provider>
  );
};

export const useSidePanelStack = (): SidePanelStack => {
  const context = useContext(SidePanelStackContext);
  if (!context) {
    throw new Error("useSidePanelStack must be used within an SidePanelStackProvider");
  }
  return context;
};
