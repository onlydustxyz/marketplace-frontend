"use client";
import { Flex } from "components/layout/flex/flex";
import React from "react";
import ProjectApi from "src/api/Project/index.ts";
import ProjectCard from "./components/project-card/project-card";
import { Filters } from "./components/filters/filters.tsx";
import { AddProject } from "./components/add-project/add-project.tsx";
import { ShowMore } from "src/components/Table/ShowMore";

function ProjectsPage() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    ProjectApi.queries.useInfiniteList({});

  const projects = data?.pages?.flatMap(({ projects }) => projects) ?? [];
  return (
    <Flex direction="col" className="max-w-7xl gap-6 p-4 md:mx-auto md:px-12 xl:pb-8 xl:pt-12">
      <Flex className="gap-6">
        <div className="sticky top-0 z-10 hidden shrink-0 basis-80 xl:block">
          <AddProject />
          <Filters />
        </div>

        <Flex direction="col" className="min-w-0 grow gap-5">
            <div className="flex grow flex-col gap-5">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
            {hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} /> : null}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProjectsPage;
