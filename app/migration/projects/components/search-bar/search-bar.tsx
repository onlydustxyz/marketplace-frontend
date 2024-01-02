import React from "react";
import { ProjectSearchBarProps } from "./search-bar.type.ts";

function ProjectSearchBar({ getProjects }: ProjectSearchBarProps) {
  return (
    <div>
      <input type="text" />
      <button onClick={() => getProjects({})}>Search</button>
    </div>
  );
}

export default ProjectSearchBar;
