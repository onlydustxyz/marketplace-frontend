import Title from "src/pages/ProjectDetails/Title";
import { useIntl } from "src/hooks/useIntl";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import CloseLine from "src/icons/CloseLine";
import Flex from "src/components/Utils/Flex";
import { useNavigate } from "react-router-dom";
import { Tabs } from "src/components/Tabs/Tabs";
import { PropsWithChildren, useState } from "react";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import FileListLine from "src/icons/FileListLine";

function TabContents({ children }: PropsWithChildren) {
  return <div className="flex items-center gap-2 md:gap-1.5">{children}</div>;
}

enum TabsType {
  General = "General",
  Repos = "Repos",
}

export default function ProjectEditionPage() {
  const { T } = useIntl();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabsType>(TabsType.General);

  const tabItems = [
    {
      active: activeTab === TabsType.General,
      onClick: () => {
        setActiveTab(TabsType.General);
      },
      children: (
        <TabContents>
          <FileListLine />
          {T("project.details.editProject.tabs.general")}
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
          {T("project.details.editProject.tabs.repositories")}
        </TabContents>
      ),
    },
  ];

  return (
    <>
      <Flex className="items-center gap-4 px-4 xl:px-8">
        <Button size={ButtonSize.Xs} type={ButtonType.Secondary} iconOnly onClick={() => navigate(-1)}>
          <CloseLine />
        </Button>
        <Title>
          <div className="flex flex-row items-center justify-between gap-2">
            {T("project.details.editProject.title")}
          </div>
        </Title>
      </Flex>

      <header className="sticky top-0 z-10 border-b border-greyscale-50/20 bg-card-background-base pb-4 pt-7 shadow-2xl backdrop-blur-3xl md:pb-0 md:pt-8">
        <div className="flex items-center justify-between px-4 xl:px-8">
          <Tabs tabs={tabItems} variant="blue" mobileTitle={T("project.details.editProject.title")} />
        </div>
      </header>
    </>
  );
}
