import { createContext, useCallback, useEffect, useState } from "react";
import { EditPanel } from ".";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

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
  isOpen: boolean;
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
  isOpen: false,
  isLoading: false,
  project: undefined,
  tabs: {
    activeTab: TabsType.Repos,
    setActiveTab: () => null,
  },
});

export function EditPanelProvider({ children, openOnLoad, isLoading, project }: EditPanelContextProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabsType>(TabsType.Repos);

  const openSidePanel = useCallback(() => {
    setOpen(true);
  }, []);

  const closeSidePanel = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleSidePanel = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  useEffect(() => {
    if (!open && openOnLoad) {
      setOpen(openOnLoad);
      setActiveTab(TabsType.Orgs);
    }
  }, [openOnLoad]);

  return (
    <EditPanelContext.Provider
      value={{
        isOpen: open && !!project,
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
