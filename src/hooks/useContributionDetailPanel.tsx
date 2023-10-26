import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { ContributionDetail } from "src/components/ContributionDetail/ContributionDetail";
import SidePanel from "src/components/SidePanel";
import GithubLogo from "src/icons/GithubLogo";
import { linkClickHandlerFactory } from "src/utils/clickHandler";
import { useIntl } from "./useIntl";

type Props = { githubUserId: number | null; contributionId: string; projectId: string };

type ContributionDetailPanel = {
  open: (props: Props, githubUrl: string) => void;
  close: () => void;
};

const ContributionDetailPanelContext = createContext<ContributionDetailPanel | null>(null);

export function ContributionDetailPanelProvider({ children }: PropsWithChildren) {
  const { T } = useIntl();
  const [props, setProps] = useState<Props>({
    githubUserId: null,
    contributionId: "",
    projectId: "",
  });
  const [githubUrl, setGithubUrl] = useState("");
  const [open, setOpen] = useState(false);

  const openSidePanel = useCallback((props: Props, githubUrl: string) => {
    setProps(props);
    setGithubUrl(githubUrl);
    setOpen(true);
  }, []);

  const closeSidePanel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <ContributionDetailPanelContext.Provider value={{ open: openSidePanel, close: closeSidePanel }}>
      {children}
      <SidePanel
        open={open}
        setOpen={setOpen}
        action={
          <Button size={ButtonSize.Sm} type={ButtonType.Secondary} onClick={linkClickHandlerFactory(githubUrl)}>
            <GithubLogo className="text-base leading-none" />
            {T("contributions.panel.githubLink")}
          </Button>
        }
      >
        {props.githubUserId && props.contributionId && props.projectId ? (
          <ContributionDetail
            githubUserId={props.githubUserId}
            contributionId={props.contributionId}
            projectId={props.projectId}
          />
        ) : null}
      </SidePanel>
    </ContributionDetailPanelContext.Provider>
  );
}

export function useContributionDetailPanel(): ContributionDetailPanel {
  const context = useContext(ContributionDetailPanelContext);

  if (!context) {
    throw new Error("useContributionDetailPanel must be used within a ContributionDetailPanelContext provider");
  }

  return context;
}
