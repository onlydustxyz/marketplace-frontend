import { createContext, useCallback, useEffect, useState } from "react";
import { EditPanel } from ".";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

interface EditPanelContextProps {
  openOnLoad: boolean;
  children: React.ReactNode;
  isLoading: boolean;
  project: UseGetProjectBySlugResponse;
}

type EditPanel = {
  open: () => void;
  close: () => void;
  toggle: (value: boolean) => void;
  isOpen: boolean;
  isLoading: boolean;
  project?: UseGetProjectBySlugResponse;
};

export const EditPanelContext = createContext<EditPanel>({
  open: () => null,
  close: () => null,
  toggle: () => null,
  isOpen: false,
  isLoading: false,
  project: undefined,
});

export function EditPanelProvider({ children, openOnLoad, isLoading, project }: EditPanelContextProps) {
  const [open, setOpen] = useState(false);

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
      }}
    >
      {children}
      <EditPanel />
    </EditPanelContext.Provider>
  );
}
