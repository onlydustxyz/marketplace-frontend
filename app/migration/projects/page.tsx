"use client";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";
import React from "react";
import ProjectApi from "src/api/Project/index.ts";
import { ShowMore } from "src/components/Table/ShowMore";

function ProjectsPage() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    ProjectApi.queries.useInfiniteList({});

  const projects = data?.pages?.flatMap(({ projects }) => projects) ?? [];
  return (
    <Flex direction="col">
      <Typography variant="title-xl">ProjectsPage</Typography>
      <div className="flex grow flex-col gap-5">
        {projects.map(project => (
          <p className="bg-green-300 p-8" key={project.name}>
            {project.name}
          </p>
        ))}
      </div>
      {hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </Flex>
  );
}

export default ProjectsPage;
