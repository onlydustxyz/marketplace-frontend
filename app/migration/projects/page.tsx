"use client";

import { useContext } from "react";

import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { ProjectsContext } from "./context/project.context";
import { ProjectsFilters } from "./features/filters/filters";
import { ProjectList } from "./features/project-list/project-list";
import { ProjectSearch } from "./features/project-search/project-search";
import { ProjectsSort } from "./features/projects-sort/projects-sort";

export default function ProjectsPage() {
  const { count } = useContext(ProjectsContext);

  return (
    <Flex className="w-full gap-6" direction="col">
      <div className="w-full">
        <ProjectSearch />
      </div>
      <Flex className="relative w-full gap-6" direction="row">
        <div className="hidden shrink-0 basis-[356px] lg:block">
          <Flex className="sticky top-0 z-10 w-full gap-4 bg-green-500 xl:block" direction="col">
            <div className="w-full self-start">CREATE</div>
            <div className="w-full self-start">
              <ProjectsFilters />
            </div>
          </Flex>
        </div>
        <Flex className="w-full flex-1 gap-5" direction="col">
          <Flex className="w-fullgap-5" direction="row">
            <div className="w-full self-start">
              <Typography
                translate={{ token: "projects.count", params: { count } }}
                variant="body-m-bold"
                className="text-spaceBlue-200"
              />
            </div>
            <div className="flex w-full justify-end">
              <ProjectsSort />
            </div>
          </Flex>
          <div className="flex w-full grow flex-col gap-5">
            <ProjectList />
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}
