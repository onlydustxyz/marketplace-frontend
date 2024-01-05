"use client";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";
import React from "react";
import ProjectApi from "src/api/Project/index.ts";
import { ShowMore } from "src/components/Table/ShowMore";
import ProjectCard from "./components/project-card/project-card.tsx";
import { isUserProjectLead } from "../../../src/utils/isUserProjectLead.ts";
import ProjectCardLoading from "./components/project-card/project-card.loading.tsx";

function ProjectsPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = ProjectApi.queries.useInfiniteList({
    queryParams: [
      ["mine", "true"],
      ["sort", "RANK"],
    ],
  });

  // Todo use the retrieve user me query to get the github user id
  const githubUserId = 17259618;

  const projects = data?.pages?.flatMap(({ projects }) => projects) ?? [];
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
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                isUserProjectLead={isUserProjectLead(project, githubUserId)}
              />
            ))}
            {hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} /> : null}
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProjectsPage;
