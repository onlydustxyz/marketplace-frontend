"use client";
import React, { useContext } from "react";
import { InfiniteScrollContext } from "../../../actions/infinite-scroll/infinite-scroll.context.tsx";
import { ProjectsListResponse } from "../../../actions/Projects/projects-queries.actions.ts";
import { InfiniteScrollReturn } from "../../../actions/infinite-scroll/infinite-scroll.context.type.ts";

function LabsPagination() {
  const { result } = useContext<InfiniteScrollReturn<ProjectsListResponse["projects"]>>(InfiniteScrollContext);
  return (
    <>
      {result.map(project => (
        <p className="bg-red-300 p-8" key={project.name}>
          {project.name}
        </p>
      ))}
    </>
  );
}

export default LabsPagination;
