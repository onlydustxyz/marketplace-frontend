"use client";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";
import React from "react";
import ProjectApi from "src/api/Project/index.ts";
import { ShowMore } from "src/components/Table/ShowMore";
import ProjectCard from "./components/project-card/project-card.tsx";
import { isUserProjectLead } from "../../../src/utils/isUserProjectLead.ts";

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
    <Flex direction="col">
      <Typography variant="title-xl">ProjectsPage</Typography>
      <div className="flex w-[840px] grow flex-col gap-5">
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
  );
}

export default ProjectsPage;
