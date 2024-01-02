import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";
import { ListProjectsParams, ProjectActions_listProjects } from "../../../actions/Projects/projects-queries.actions.ts";
import React from "react";
import { LoadMore } from "@/components/layout/api/load-more/load-more.tsx";

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

    return [
      ...projects.projects.map(project => (
        <p className="bg-green-300 p-8" key={project.name}>
          {project.name}
        </p>
      )),
      <LoadMore
        key={params.pageIndex}
        params={{
          ...params,
          pageIndex: projects.nextPageIndex,
        }}
        hasMore={projects.hasMore}
        onFetchMore={getProjects}
      />,
    ];
  }

  const projects = await getProjects(paramsObject);

  return (
    <Flex>
      <Typography variant="title-xl">ProjectsPage</Typography>
      <div className="flex grow flex-col gap-5">{projects}</div>
    </Flex>
  );
}

export default ProjectsPage;
