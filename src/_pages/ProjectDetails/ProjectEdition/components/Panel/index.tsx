import { PropsWithChildren, useContext, useMemo } from "react";

import { Flex } from "src/components/New/Layout/Flex";
import { Tabs } from "src/components/Tabs/Tabs";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import GlobalLine from "src/icons/GlobalLine";
import { RegisterStack } from "src/libs/react-stack";

import { useIntl } from "hooks/translate/use-translate";

import { EditContext } from "../../EditContext";
import { EditPanelOrganization } from "./OrganizationTab/EditPanelOrganization";
import { EditPanelRepositories } from "./RepositoriesTabs/EditPanelRepositories";
import { EditPanelContext, TabsType } from "./context";

function TabContents({ children }: PropsWithChildren) {
  return <Flex className="items-center gap-2 md:gap-1.5">{children}</Flex>;
}

export const EDIT_PANEL_NAME = (id: string) => `project-edit-panel-${id}`;

export const SafeEditPanel = () => {
  const { T } = useIntl();
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
      <div className="flex h-full flex-col px-4 pb-8">
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
  const { project } = useContext(EditContext);
  return (
    <RegisterStack unRegisterOnUnMount name={EDIT_PANEL_NAME(project?.id || "")}>
      {() => <SafeEditPanel />}
    </RegisterStack>
  );
};
