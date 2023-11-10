import { createContext, useCallback, useEffect, useState } from "react";
import { EditPanel } from ".";

interface EditPanelContextProps {
  projectSlug?: string;
  openOnLoad: boolean;
  children: React.ReactNode;
}

type EditPanel = {
  open: () => void;
  close: () => void;
  toggle: (value: boolean) => void;
  projectSlug?: string;
  isOpen: boolean;
};

export const EditPanelContext = createContext<EditPanel>({
  open: () => null,
  close: () => null,
  toggle: () => null,
  projectSlug: undefined,
  isOpen: false,
});

export function EditPanelProvider({ children, projectSlug, openOnLoad }: EditPanelContextProps) {
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
  }, [openOnLoad, open]);

  return (
    <EditPanelContext.Provider
      value={{
        isOpen: open && !!projectSlug,
        projectSlug,
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
