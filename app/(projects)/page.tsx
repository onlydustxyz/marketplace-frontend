"use client";

import { useContext } from "react";

import { withClientOnly } from "components/layout/client-only/client-only";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { ProjectsContext, ProjectsContextProvider } from "./context/project.context";
import { ProjectsFilters } from "./features/filters/filters";
import { NoResults } from "./features/no-results/no-results";
import { ProjectList } from "./features/project-list/project-list";
import { ProjectSearch } from "./features/project-search/project-search";
import { ProjectsSort } from "./features/projects-sort/projects-sort";
import { UserProjects } from "./features/user-projects/user-projects";

function SafeProjectsPage() {
  const { count, projects, isLoading } = useContext(ProjectsContext);

  return (
    <Flex className="w-full gap-6" direction="col">
      <div className="w-full">
        <ProjectSearch />
      </div>
      <Flex className="relative w-full gap-6" direction="row">
        <div className="hidden shrink-0 basis-[356px] lg:block">
          <Flex className="sticky top-3 z-10 w-full gap-3" direction="col">
            <div className="w-full self-start">
              <UserProjects />
            </div>

            <div className="w-full self-start">
              <ProjectsFilters showOn="desktop" />
            </div>
          </Flex>
        </div>
        <Flex className="w-full flex-1 gap-5 overflow-hidden" direction="col">
          <Flex className="w-full gap-5" direction="row" alignItems="center">
            <div className="flex justify-start gap-2">
              <ProjectsSort />
              <ProjectsFilters showOn="mobile" />
            </div>
            <div className="flex-1 text-right">
              <Typography
                translate={{ token: "v2.pages.projects.count", params: { count } }}
                variant="body-m-bold"
                className="uppercase text-spaceBlue-200"
              />
            </div>
          </Flex>
          <div className="flex w-full grow flex-col gap-5">
            <div className="block w-full self-start lg:hidden">
              <UserProjects />
            </div>

            {isLoading || projects.length > 0 ? <ProjectList /> : <NoResults />}
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}

function ProjectsPage() {
  return (
    <ProjectsContextProvider>
      <div className="relative z-[1] h-full w-full overflow-y-auto bg-no-repeat scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5 lg:rounded-3xl">
        <div className="flex max-w-7xl flex-col gap-6 px-4 py-4 md:mx-auto md:px-12 xl:pb-8 xl:pt-12 ">
          <SafeProjectsPage />
        </div>
      </div>
    </ProjectsContextProvider>
  );
}

export default withClientOnly(ProjectsPage);
