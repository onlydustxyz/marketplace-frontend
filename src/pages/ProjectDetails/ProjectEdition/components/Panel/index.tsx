import { EditPanelOrganization } from "./OrganizationTab/EditPanelOrganization";
import { EditPanelRepositories } from "./RepositoriesTabs/EditPanelRepositories";
import { PropsWithChildren, useContext, useMemo } from "react";
import { EditPanelContext, TabsType } from "./context";
import { Flex } from "src/components/New/Layout/Flex";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { useIntl } from "src/hooks/useIntl";
import GlobalLine from "src/icons/GlobalLine";
import { Tabs } from "src/components/Tabs/Tabs";
import { EditContext } from "../../EditContext";
import { RegisterStack } from "src/libs/react-stack";

function TabContents({ children }: PropsWithChildren) {
  return <Flex className="items-center gap-2 md:gap-1.5">{children}</Flex>;
}

export const EDIT_PANEL_NAME = "project-edit-panel";

export const SafeEditPanel = () => {
  const { T } = useIntl();
  const { PoolingFeedback } = useContext(EditContext);
  const {
    tabs: { activeTab, setActiveTab },
  } = useContext(EditPanelContext);

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
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex h-full flex-col px-4 py-8">
        <div className="mb-8 px-2 font-belwe text-2xl font-normal text-greyscale-50">
          {T("project.details.edit.panel.title")}
        </div>
        <div className="mb-6 w-full px-2 md:border-b md:border-greyscale-50/8">
          <Tabs tabs={tabItems} showMobile mobileTitle={T("project.details.edit.panel.title")} />
        </div>
        <div className="scrollbar-sm flex-1 overflow-auto px-2">{ActiveTab}</div>
      </div>
    </div>
  );
};

export const EditPanel = () => {
  return <RegisterStack name={EDIT_PANEL_NAME}>{() => <SafeEditPanel />}</RegisterStack>;
};
