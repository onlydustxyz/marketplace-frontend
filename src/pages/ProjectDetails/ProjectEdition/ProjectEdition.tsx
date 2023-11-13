import { PropsWithChildren, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { Tabs } from "src/components/Tabs/Tabs";
import { useIntl } from "src/hooks/useIntl";
import ArrowRightSLine from "src/icons/ArrowRightSLine";
import CloseLine from "src/icons/CloseLine";
import FileListLine from "src/icons/FileListLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Title from "../Title";
import { Flex } from "src/components/New/Layout/Flex";

import { cn } from "src/utils/cn";

import ProjectApi from "src/api/Project";
import { FormStatus } from "src/components/FormStatus/FormStatus";
import Card from "src/components/Card";
import { Information } from "./pages/Information";
import { Repository } from "./pages/Repository";
import { EditContext, EditProvider } from "./EditContext";
import { EditPanelProvider } from "./components/Panel/context";

function TabContents({ children }: PropsWithChildren) {
  return <Flex className="items-center gap-2 md:gap-1.5">{children}</Flex>;
}

enum TabsType {
  General = "General",
  Repos = "Repos",
}

function SafeProjectEdition() {
  const { T } = useIntl();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabsType>(TabsType.General);
  const { form } = useContext(EditContext);

  const tabItems = [
    {
      active: activeTab === TabsType.General,
      onClick: () => {
        setActiveTab(TabsType.General);
      },
      children: (
        <TabContents>
          <FileListLine />
          {T("project.details.edit.tabs.general")}
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
          {T("project.details.edit.tabs.repositories")}
        </TabContents>
      ),
    },
  ];

  return (
    <Flex className="h-[calc(100vh-68px)] flex-col xl:h-[calc(100vh-77px-1.5rem)]">
      <Flex className="items-center px-4 py-6 xl:px-8">
        <Button size={ButtonSize.Xs} type={ButtonType.Secondary} iconOnly onClick={() => navigate(-1)} className="mr-3">
          <CloseLine />
        </Button>
        <Title>
          <Flex className="flex-row items-center justify-between gap-2">{T("project.details.edit.title")}</Flex>
        </Title>
      </Flex>

      <header className="z-10 w-full border-b border-greyscale-50/20 bg-whiteFakeOpacity-8 px-4 pb-4 pt-7 shadow-2xl backdrop-blur-3xl md:px-8 md:pb-0 md:pt-8 ">
        <Tabs tabs={tabItems} variant="blue" mobileTitle={T("project.details.edit.title")} />
      </header>

      <Flex className={cn("scrollbar-sm bg-transparency-gradiant w-full flex-1 justify-center overflow-y-scroll p-6")}>
        <Card>
          {activeTab === TabsType.General ? <Information /> : <Repository isError={false} isLoading={false} />}
        </Card>
      </Flex>

      <Flex
        justify="between"
        item="center"
        gap={4}
        className="max-h-[88px] w-full items-center border-t border-card-border-light bg-card-background-base p-6 shadow-medium xl:rounded-b-2xl"
      >
        <FormStatus {...{ isDirty: form?.formState.isDirty, isValid: form?.formState.isValid }} />
        <Button size={ButtonSize.Md} htmlType="submit">
          Save changes
          <ArrowRightSLine className="-mr-2 text-2xl" />
        </Button>
      </Flex>
    </Flex>
  );
}

export default function ProjectEdition() {
  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const { data, isLoading, isError } = ProjectApi.queries.useGetProjectBySlug({ params: { slug: projectKey } });

  if (!data) {
    /** TODO handle loading and error */
    return null;
  }
  return (
    <EditProvider project={data}>
      <EditPanelProvider openOnLoad={false}>
        <SafeProjectEdition />
      </EditPanelProvider>
    </EditProvider>
  );
}
