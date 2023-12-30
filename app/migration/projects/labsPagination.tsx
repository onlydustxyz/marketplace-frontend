"use client";
import React, { useContext } from "react";
import {
  BaseInfiniteScrollPagination,
  InfiniteScrollContext,
  InfiniteScrollProvider,
  InfiniteScrollReturn,
} from "../../../actions/infinite-scroll/infinite-scroll.context.tsx";
import { ProjectsActions } from "../../../actions/Projects/projects.actions.ts";
import { ProjectsListResponse } from "../../../actions/Projects/projects-queries.actions.ts";
import { BaseQueries } from "../../../actions/base-queries.actions.ts";
import { ACTION_PATH } from "../../../actions/path.actions.ts";
import { ProjectActionTags } from "../../../actions/Projects/projects-tags.actions.ts";

function SafeLabsPagination() {
  const { result } = useContext<InfiniteScrollReturn<ProjectsListResponse["projects"]>>(InfiniteScrollContext);
  return (
    <>
      {result.map((project, index) => (
        <p className="bg-red-300 p-8" key={project.name}>
          {project.name}
        </p>
      ))}
    </>
  );
}

function LabsPagination(props: BaseInfiniteScrollPagination) {
  const onFetch = async (previousPagination: BaseInfiniteScrollPagination) => {
    console.log("previousPagination", previousPagination);
    // const projects = await ProjectsActions.queries.listProjects({
    //   params: {
    //     pageIndex: previousPagination.nextPageIndex,
    //     pageSize: 10,
    //     mine: false,
    //     sort: "RANK",
    //   },
    // });

    const projects = await BaseQueries<ProjectsListResponse>(ACTION_PATH.PROJECTS, {
      provideTag: [ProjectActionTags.all, ProjectActionTags.list],
      params: {
        pageIndex: previousPagination.nextPageIndex,
        pageSize: 10,
        mine: false,
        sort: "RANK",
      },
    });

    return {
      ...projects,
      data: projects.projects,
    };
  };
  return (
    <InfiniteScrollProvider {...props} onFetchMore={onFetch}>
      <SafeLabsPagination />
    </InfiniteScrollProvider>
  );
}

export default LabsPagination;
