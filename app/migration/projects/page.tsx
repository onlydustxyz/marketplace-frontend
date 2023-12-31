import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";
import LabsPagination from "./labsPagination.tsx";
import { ListProjectsParams, ProjectActions_listProjects } from "../../../actions/Projects/projects-queries.actions.ts";
import { InfiniteScrollProvider } from "../../../actions/infinite-scroll/infinite-scroll.context.tsx";
import React from "react";

async function ProjectsPage() {
  const paramsObject = {
    pageIndex: 0,
    pageSize: 10,
    mine: false,
    sort: "RANK",
  };

  async function getProjects(params: ListProjectsParams) {
    "use server";
    const projects = await ProjectActions_listProjects({
      params,
    });

    return {
      ...projects,
      data: projects.projects,
    };
  }

  const projects = await getProjects(paramsObject);

  return (
    <Flex>
      <Typography variant="title-xl">ProjectsPage</Typography>
      <div className="flex grow flex-col gap-5">
        {projects.data.map(project => (
          <p className="bg-red-300 p-8" key={project.name}>
            {project.name}
          </p>
        ))}
        <InfiniteScrollProvider {...projects} onFetchMore={getProjects} pageSize={10}>
          <LabsPagination />
        </InfiniteScrollProvider>
      </div>
    </Flex>
  );
}

export default ProjectsPage;
