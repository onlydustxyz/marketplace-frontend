"use client";
import { Flex } from "components/layout/flex/flex";
import React, { useContext } from "react";
import { ProjectList } from "./features/project-list";
import { ProjectsContext } from "./context/project.context.tsx";
import { Typography } from "@/components/layout/typography/typography.tsx";
import { Filters } from "./components/filters/filters.tsx";

function ProjectsPage() {
  const { count } = useContext(ProjectsContext);

  return (
    <Flex className="w-full gap-6" direction="col">
      <div className="col-span-2 row-auto self-start">SEARCH</div>
      <Flex className="relative w-full gap-6" direction="row">
        <div className="w-full">
          <Flex
            className="sticky top-0 z-10 hidden w-full shrink-0 basis-80 gap-4 bg-green-500 xl:block"
            direction="col"
          >
            <div className="w-full self-start">CREATE</div>
            <div className="w-full self-start">
              <Filters />
            </div>
          </Flex>
        </div>
        <Flex className="w-full flex-1 gap-5" direction="col">
          <Flex className="w-fullgap-5" direction="row">
            <div className="w-full self-start">
              <Typography
                translate={{ token: "projects.count", params: { count: count } }}
                variant="body-m-bold"
                className="text-spaceBlue-200"
              />
            </div>
            <div className="w-full self-start">SORT</div>
          </Flex>
          <div className="flex w-full grow flex-col gap-5">
            <ProjectList />
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProjectsPage;
