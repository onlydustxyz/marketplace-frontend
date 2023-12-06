import { createContext, useCallback, useEffect, useState } from "react";
import { EDIT_PANEL_NAME, EditPanel } from ".";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { useStackNavigation } from "src/libs/react-stack";

interface EditPanelContextProps {
  openOnLoad: boolean;
  children: React.ReactNode;
  isLoading: boolean;
  project: UseGetProjectBySlugResponse;
}

export enum TabsType {
  Orgs = "Orgs",
  Repos = "Repos",
}

type EditPanelType = {
  open: () => void;
  close: () => void;
  toggle: (value: boolean) => void;
  isLoading: boolean;
  project?: UseGetProjectBySlugResponse;
  tabs: {
    activeTab: TabsType;
    setActiveTab: (tab: TabsType) => void;
  };
};

export const EditPanelContext = createContext<EditPanelType>({
  open: () => null,
  close: () => null,
  toggle: () => null,
  isLoading: false,
  project: undefined,
  tabs: {
    activeTab: TabsType.Repos,
    setActiveTab: () => null,
  },
});

export function EditPanelProvider({ children, openOnLoad, isLoading }: EditPanelContextProps) {
  const [activeTab, setActiveTab] = useState<TabsType>(TabsType.Repos);
  const [openSidePanel, closeSidePanel] = useStackNavigation(EDIT_PANEL_NAME);

  const toggleSidePanel = useCallback((value: boolean) => {
    if (value) {
      openSidePanel();
    } else {
      closeSidePanel();
    }
  }, []);

  useEffect(() => {
    if (openOnLoad) {
      closeSidePanel();
      openSidePanel();
      setActiveTab(TabsType.Orgs);
    }
  }, [openOnLoad]);

  return (
    <EditPanelContext.Provider
      value={{
        isLoading,
        open: openSidePanel,
        toggle: toggleSidePanel,
        close: closeSidePanel,
        tabs: {
          activeTab,
          setActiveTab,
        },
      }}
    >
      {children}
      <EditPanel />
    </EditPanelContext.Provider>
  );
}
