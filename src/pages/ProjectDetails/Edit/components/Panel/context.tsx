import { createContext, useCallback, useEffect, useState } from "react";
import { EditPanel } from ".";
import ProjectApi from "src/api/Project";
import { useParams } from "react-router-dom";
import { UseProjectDetailsResponse } from "src/api/Project/queries";

interface EditPanelContextProps {
  projectSlug?: string;
  openOnLoad: boolean;
  children: React.ReactNode;
}

type EditPanel = {
  open: () => void;
  close: () => void;
  toggle: (value: boolean) => void;
  loadingProject: boolean;
  isOpen: boolean;
  project?: UseProjectDetailsResponse;
};

export const EditPanelContext = createContext<EditPanel>({
  open: () => null,
  close: () => null,
  toggle: () => null,
  loadingProject: false,
  isOpen: false,
  project: undefined,
});

export function EditPanelProvider({ children, projectSlug, openOnLoad }: EditPanelContextProps) {
  const [open, setOpen] = useState(false);
  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const { data, isPending } = ProjectApi.queries.useDetails({
    params: { projectKey },
    options: {
      enabled: !!projectKey && open,
    },
  });

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
        loadingProject: isPending,
        isOpen: open && !!projectSlug,
        project: data,
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
