import { createContext, PropsWithChildren, useContext, useState } from "react";

type SidePanelStack = {
  open: (setOpen: SetOpen) => number;
  close: () => void;
  openPanelCount: number;
  closeLastPanel: () => void;
};

type SetOpen = (value: boolean) => void;

const SidePanelStackContext = createContext<SidePanelStack | null>(null);

export const SidePanelStackProvider = ({ children }: PropsWithChildren) => {
  const [openPanelCount, setOpenPanelCount] = useState(0);
  const [latestSetOpen, setLatestSetOpen] = useState<SetOpen>();

  function open(setOpen: SetOpen) {
    const panelIndex = openPanelCount;
    setOpenPanelCount(c => c + 1);
    setLatestSetOpen(() => setOpen);
    return panelIndex;
  }

  function close() {
    setOpenPanelCount(c => c - 1);
  }

  function closeLastPanel() {
    close();
    latestSetOpen?.(false);
  }

  return (
    <SidePanelStackContext.Provider
      value={{
        open,
        close,
        openPanelCount,
        closeLastPanel,
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
