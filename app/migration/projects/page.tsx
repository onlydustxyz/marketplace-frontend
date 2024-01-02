import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";
import { ListProjectsParams, ProjectActions_listProjects } from "../../../actions/Projects/projects-queries.actions.ts";
import React from "react";
import { LoadMore } from "@/components/layout/api/load-more/load-more.tsx";
import { FilterProviders } from "../../../actions/context/Filters/filters.context.tsx";
import SearchBar from "./components/search-bar/search-bar.tsx";

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

    // filter should call this function but pageIndex should be 0

    return (
      <div className="flex grow flex-col gap-5">
        <SearchBar />
        {projects.projects.map(project => (
          <p className="bg-green-300 p-8" key={project.name}>
            {project.name}
          </p>
        ))}
        <LoadMore
          key={params.pageIndex}
          params={{
            ...params,
            pageIndex: projects.nextPageIndex,
          }}
          hasMore={projects.hasMore}
          onFetchMore={getProjects}
        />
      </div>
    );
  }

  const projects = await getProjects(paramsObject);

  return (
    <Flex>
      <Typography variant="title-xl">ProjectsPage</Typography>
      <FilterProviders getPage={getProjects} pageSize={10} initialPage={projects}>
        <div className="flex grow flex-col gap-5">
          <SearchBar />
          {children}
        </div>
      </FilterProviders>
    </Flex>
  );
}

export default ProjectsPage;
