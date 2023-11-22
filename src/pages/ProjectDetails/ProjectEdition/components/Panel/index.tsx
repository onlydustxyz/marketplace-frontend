import SidePanel from "src/components/SidePanel";
import { EditPanelOrganization } from "./OrganizationTab/EditPanelOrganization";
import { EditPanelRepositories } from "./RepositoriesTabs/EditPanelRepositories";
import { PropsWithChildren, useContext, useMemo, useState } from "react";
import { EditPanelContext } from "./context";
import { Flex } from "src/components/New/Layout/Flex";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { useIntl } from "src/hooks/useIntl";
import GlobalLine from "src/icons/GlobalLine";
import { Tabs } from "src/components/Tabs/Tabs";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import GithubLogo from "src/icons/GithubLogo";
import { OAuthGithubConfigLink } from "src/utils/githubSetupLink";

enum TabsType {
  Orgs = "Orgs",
  Repos = "Repos",
}

function TabContents({ children }: PropsWithChildren) {
  return <Flex className="items-center gap-2 md:gap-1.5">{children}</Flex>;
}

export const EditPanel = () => {
  const { T } = useIntl();
  const { isOpen, toggle } = useContext(EditPanelContext);
  const [activeTab, setActiveTab] = useState<TabsType>(TabsType.Orgs);
  const tabItems = useMemo(
    () => [
      {
        active: activeTab === TabsType.Orgs,
        onClick: () => {
          setActiveTab(TabsType.Orgs);
        },
        children: (
          <TabContents>
            <GlobalLine />
            {T("project.details.edit.panel.tabs.organizations")}
          </TabContents>
        ),
      },
      {
        active: activeTab === TabsType.Repos,
        onClick: () => {
          setActiveTab(TabsType.Repos);
        },
        children: (
          <TabContents>
            <GitRepositoryLine />
            {T("project.details.edit.panel.tabs.repositories")}
          </TabContents>
        ),
      },
    ],
    [activeTab]
  );

  const ActiveTab = useMemo(() => {
    switch (activeTab) {
      case TabsType.Repos:
        return <EditPanelRepositories />;
      default:
        return <EditPanelOrganization />;
    }
  }, [activeTab]);

  return (
    <SidePanel open={isOpen} setOpen={toggle}>
      <div className="scrollbar-sm flex h-full flex-col ">
        <div className="flex flex-col px-6 py-8">
          <div className="mb-8 font-belwe text-2xl font-normal text-greyscale-50">
            {T("project.details.edit.panel.title")}
          </div>
          <div className="mb-6 w-full md:border-b md:border-greyscale-50/8">
            <Tabs tabs={tabItems} showMobile mobileTitle={T("project.details.edit.panel.title")} />
          </div>
          {ActiveTab}
        </div>
        <div className="card-light mt-4 flex w-full flex-col items-center justify-start gap-6 border-0 p-4">
          <div className="flex flex-row items-center justify-center gap-0.5">
            <p className="mt-3 text-center text-gray-500">
              {T("project.details.create.organizations.githubAppInformation.title")}
            </p>
          </div>
          <a href={OAuthGithubConfigLink} target="_blank" rel="noopener noreferrer">
            <Button type={ButtonType.Secondary} size={ButtonSize.Sm}>
              <GithubLogo />
              {T("project.details.create.organizations.githubAppInformation.button")}
            </Button>
          </a>
        </div>
      </div>
    </SidePanel>
  );
};
