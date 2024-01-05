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
    <>
      <div className="flex max-w-7xl flex-col gap-6 px-4 py-4 md:mx-auto md:px-12 xl:pb-8 xl:pt-12">
        <Flex className="w-full gap-6" direction="col">
          <div className="col-span-2 row-auto self-start bg-blue-500">SEARCH</div>
          <Flex className="w-full gap-6" direction="row">
            <Flex className="w-full  gap-4 bg-green-500" direction="col">
              <div className="w-full self-start bg-green-300">CREATE</div>
              <div className="w-full self-start bg-green-300">FILTERS</div>
            </Flex>
            <Flex className="w-full  gap-5 bg-red-500" direction="col">
              <Flex className="w-fullgap-5 bg-red-500" direction="row">
                <div className="w-full self-start bg-red-300">COUNT</div>
                <div className="w-full self-start bg-red-300">SORT</div>
              </Flex>
              <div className="w-full self-start bg-red-300">PROJECT</div>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <Flex direction="col">
        <Typography variant="title-xl">ProjectsPage</Typography>
        <div className="flex w-[840px] grow flex-col gap-5">
          <ProjectCardLoading />
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              isUserProjectLead={isUserProjectLead(project, githubUserId)}
            />
          ))}
        </div>
        {hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </Flex>
    </>
  );
}

export default ProjectsPage;
