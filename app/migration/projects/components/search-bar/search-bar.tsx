import React, { useContext } from "react";
import { ProjectSearchBarProps } from "./search-bar.type.ts";
import { FilterContext } from "../../../../../actions/context/Filters/filters.context.tsx";
import { ListProjectsParams } from "../../../../../actions/Projects/projects-queries.actions.ts";

function ProjectSearchBar({ getProjects }: ProjectSearchBarProps) {
  // const { get } = useContext<ListProjectsParams>(FilterContext);
  return (
    <div>
      <input type="text" />
      <button onClick={() => getProjects({})}>Search</button>
    </div>
  );
}

export default ProjectSearchBar;
