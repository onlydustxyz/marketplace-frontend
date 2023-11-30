import { createContext, PropsWithChildren, useCallback, useContext } from "react";
import { useStackContributorProfile } from "src/App/Stacks";

type ContributorProfilePanel = {
  open: (githubUserId: number) => void;
};

const ContributorProfilePanelContext = createContext<ContributorProfilePanel | null>(null);

export const ContributorProfilePanelProvider = ({ children }: PropsWithChildren) => {
  //   const [githubUserId, setGithubUserId] = useState<number>();
  //   const [open, setOpen] = useState(false);
  const [openProfilePanel] = useStackContributorProfile();

  const openSidePanel = useCallback((githubUserId: number) => {
    // setGithubUserId(githubUserId);
    // setOpen(true);
    if (githubUserId) {
      openProfilePanel({ githubUserId });
    }
  }, []);

  return (
    <ContributorProfilePanelContext.Provider value={{ open: openSidePanel }}>
      {children}
      {/* <SidePanel open={open} setOpen={setOpen}>
        {githubUserId && <ContributorProfileSidePanel githubUserId={githubUserId} setOpen={setOpen} />}
      </SidePanel> */}
    </ContributorProfilePanelContext.Provider>
  );
};

export const useContributorProfilePanel = (): ContributorProfilePanel => {
  const context = useContext(ContributorProfilePanelContext);
  if (!context) {
    throw new Error("useContributorProfilePanel must be used within an ContributorProfilePanelProvider");
  }
  return context;
};
