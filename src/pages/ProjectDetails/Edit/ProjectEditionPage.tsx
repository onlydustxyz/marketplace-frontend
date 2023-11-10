import { PropsWithChildren, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { Tabs } from "src/components/Tabs/Tabs";
import { useIntl } from "src/hooks/useIntl";
import ArrowRightSLine from "src/icons/ArrowRightSLine";
import CloseLine from "src/icons/CloseLine";
import FileListLine from "src/icons/FileListLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Title from "../Title";
import { Flex } from "src/components/New/Layout/Flex";
import RepositoriesTab from "./RepositoriesTab";
import { cn } from "src/utils/cn";
import { DescriptionForm } from "./components/Form/DescriptionForm";
import { OutletContext } from "../View";
import ProjectApi from "src/api/Project";
import { EditPanelProvider } from "./components/Panel/context";

function TabContents({ children }: PropsWithChildren) {
  return <Flex className="items-center gap-2 md:gap-1.5">{children}</Flex>;
}

enum TabsType {
  General = "General",
  Repos = "Repos",
}

export default function ProjectEditionPage() {
  const { project } = useOutletContext<OutletContext>();
  const { slug: projectKey } = project;

  const { T } = useIntl();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabsType>(TabsType.General);

  // TODO: Use query
  const { data, isLoading, isError } = ProjectApi.queries.useDetails({
    params: { projectKey },
    options: { refetchOnMount: false, refetchOnWindowFocus: false },
  });

  // TODO: Use mutation
  const { mutate, ...rest } = ProjectApi.mutations.useUpdateroject({
    params: { projectKey },
    options: {
      onSuccess: async () => {
        //noop
      },
    },
  });

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
    <EditPanelProvider openOnLoad={false} projectSlug="mock-project-slug">
      <Flex className="h-[calc(100vh-68px)] flex-col xl:h-[calc(100vh-77px-1.5rem)]">
        <Flex className="items-center px-4 py-6 xl:px-8">
          <Button
            size={ButtonSize.Xs}
            type={ButtonType.Secondary}
            iconOnly
            onClick={() => navigate(-1)}
            className="mr-3"
          >
            <CloseLine />
          </Button>
          <Title>
            <Flex className="flex-row items-center justify-between gap-2">{T("project.details.edit.title")}</Flex>
          </Title>
        </Flex>

        <header className="z-10 w-full border-b border-greyscale-50/20 bg-whiteFakeOpacity-8 px-4 pb-4 pt-7 shadow-2xl backdrop-blur-3xl md:px-8 md:pb-0 md:pt-8 ">
          <Tabs tabs={tabItems} variant="blue" mobileTitle={T("project.details.edit.title")} />
        </header>

        <Flex
          className={cn("scrollbar-sm bg-transparency-gradiant w-full flex-1 justify-center overflow-y-scroll p-6")}
        >
          {activeTab === TabsType.General ? <DescriptionForm /> : <RepositoriesTab {...{ data, isLoading, isError }} />}
        </Flex>

        <Flex
          justify="between"
          item="center"
          gap={4}
          className="max-h-[88px] w-full items-center border-t border-card-border-light bg-card-background-base p-6 shadow-medium xl:rounded-b-2xl"
        >
          <div></div>
          <Button size={ButtonSize.Md}>
            Save changes
            <ArrowRightSLine className="-mr-2 text-2xl" />
          </Button>
        </Flex>
      </Flex>
    </EditPanelProvider>
  );
}
