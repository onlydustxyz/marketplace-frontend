"use client";
import { Flex } from "components/layout/flex/flex";
import React from "react";
import { ProjectList } from "./features/project-list";

function ProjectsPage() {
  return (
    <Flex className="w-full gap-6" direction="col">
      <div className="col-span-2 row-auto self-start bg-blue-500">SEARCH</div>
      <Flex className="relative w-full gap-6" direction="row">
        <div className="w-full">
          <Flex
            className="sticky top-0 z-10 hidden w-full shrink-0 basis-80 gap-4 bg-green-500 xl:block"
            direction="col"
          >
            <div className="w-full self-start bg-green-300">CREATE</div>
            <div className="w-full self-start bg-green-300">FILTERS</div>
          </Flex>
        </div>
        <Flex className="w-full flex-1 gap-5 bg-red-500" direction="col">
          <Flex className="w-fullgap-5 bg-red-500" direction="row">
            <div className="w-full self-start bg-red-300">COUNT</div>
            <div className="w-full self-start bg-red-300">SORT</div>
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
