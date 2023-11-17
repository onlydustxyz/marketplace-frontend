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
      <div className="flex h-full flex-col px-6 py-8">
        <div className="mb-8 font-belwe text-2xl font-normal text-greyscale-50">
          {T("project.details.edit.panel.title")}
        </div>
        <div className="mb-6 w-full">
          <Tabs tabs={tabItems} variant="blue" showMobile mobileTitle={T("project.details.edit.panel.title")} />
        </div>
        {ActiveTab}
      </div>
    </SidePanel>
  );
};
