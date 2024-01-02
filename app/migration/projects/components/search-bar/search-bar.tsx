"use client";
import React, { useContext } from "react";
import { ProjectSearchBarProps } from "./search-bar.type.ts";
import { FilterContext, useFilterContext } from "../../../../../actions/context/Filters/filters.context.tsx";
import { ListProjectsParams } from "../../../../../actions/Projects/projects-queries.actions.ts";

function ProjectSearchBar() {
  const [text, setText] = React.useState("");
  // const { get } = useContext<ListProjectsParams>(FilterContext);
  const { onChange } = useFilterContext<ListProjectsParams>();

  return (
    <div>
      <input type="text" onChange={e => setText(e.target.value)} />
      <button
        onClick={() =>
          onChange({
            search: text,
          })
        }
      >
        Search
      </button>
    </div>
  );
}

export default ProjectSearchBar;
