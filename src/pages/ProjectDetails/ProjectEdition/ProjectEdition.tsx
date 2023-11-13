import { PropsWithChildren, useContext, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ErrorFallback from "src/ErrorFallback";
import ProjectApi from "src/api/Project";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Card from "src/components/Card";
import { FormStatus } from "src/components/FormStatus/FormStatus";
import Loader from "src/components/Loader";
import { Flex } from "src/components/New/Layout/Flex";
import { Tabs } from "src/components/Tabs/Tabs";
import Center from "src/components/Utils/Center";
import { useIntl } from "src/hooks/useIntl";
import ArrowRightSLine from "src/icons/ArrowRightSLine";
import CloseLine from "src/icons/CloseLine";
import FileListLine from "src/icons/FileListLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { cn } from "src/utils/cn";
import Title from "../Title";
import { EditContext, EditProvider } from "./EditContext";
import { Information } from "./pages/Information";
import { Repository } from "./pages/Repository/Repository";

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
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";
  const [activeTab, setActiveTab] = useState<TabsType>(installation_id ? TabsType.Repos : TabsType.General);
  const { project, form } = useContext(EditContext);

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

  const handleGoBack = () => {
    if (project?.slug !== location?.state?.slug) {
      const prevPath = location.state.prevPath.replace(location.state.slug, project?.slug);
      return navigate(prevPath, { replace: true });
    }

    return navigate(-1);
  };

  return (
    <Flex className="h-full w-full flex-col">
      <Flex className="w-full flex-col">
        <Flex className="items-center px-4 py-6 xl:px-8">
          <Button size={ButtonSize.Xs} type={ButtonType.Secondary} iconOnly onClick={handleGoBack} className="mr-3">
            <CloseLine />
          </Button>
          <Title>
            <Flex className="flex-row items-center justify-between gap-2">{T("project.details.edit.title")}</Flex>
          </Title>
        </Flex>

        <header className="z-10 w-full border-b border-greyscale-50/20 bg-whiteFakeOpacity-8 px-4 pb-4 pt-7 shadow-2xl backdrop-blur-3xl md:px-8 md:pb-0 md:pt-8 ">
          <Tabs tabs={tabItems} variant="blue" mobileTitle={T("project.details.edit.title")} />
        </header>
      </Flex>

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
        <Button
          size={ButtonSize.Md}
          htmlType="submit"
          disabled={!form?.formState.isDirty || !form?.formState.isValid || form?.formState.isSubmitting}
        >
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

  if (isLoading || !data) {
    return (
      <Center className="h-full">
        <Loader />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center className="h-full overflow-hidden">
        <ErrorFallback />
      </Center>
    );
  }

  return (
    <EditProvider project={data}>
      <SafeProjectEdition />
    </EditProvider>
  );
}
