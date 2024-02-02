"use client";

import { useContext } from "react";

import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { ProjectsContext, ProjectsContextProvider } from "./context/project.context";
import { AddProject } from "./features/add-project/add-project";
import { ProjectsFilters } from "./features/filters/filters";
import { NoResults } from "./features/no-results/no-results";
import { ProjectList } from "./features/project-list/project-list";
import { ProjectSearch } from "./features/project-search/project-search";
import { ProjectsSort } from "./features/projects-sort/projects-sort";

export function SafeProjectsPage() {
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
              <ProjectsFilters showOn="desktop" />
            </div>
            <div className="w-full self-start">
              <AddProject />
            </div>
          </Flex>
        </div>
        <Flex className="w-full flex-1 gap-5 overflow-hidden" direction="col">
          <Flex className="w-full gap-5" direction="row" alignItems="center">
            <div className="w-full">
              <Typography
                translate={{ token: "v2.pages.projects.count", params: { count } }}
                variant="body-m-bold"
                className="uppercase text-spaceBlue-200"
              />
            </div>
            <div className="flex w-full justify-end gap-2">
              <ProjectsSort />
              <ProjectsFilters showOn="mobile" />
            </div>
          </Flex>
          <div className="flex w-full grow flex-col gap-5">
            {isLoading || projects.length > 0 ? <ProjectList /> : <NoResults />}
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default function ProjectsPage() {
  return (
    <ProjectsContextProvider>
      <div className="od-space-background h-full w-full overflow-y-auto bg-no-repeat scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5 lg:rounded-3xl">
        <div className="flex max-w-7xl flex-col gap-6 px-4 py-4 md:mx-auto md:px-12 xl:pb-8 xl:pt-12 ">
          <SafeProjectsPage />
        </div>
      </div>
    </ProjectsContextProvider>
  );
}
