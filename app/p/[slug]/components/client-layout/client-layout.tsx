"use client";

import { useParams } from "next/navigation";
import { matchPath, useLocation } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import { ProjectRoutePaths, RoutePaths } from "src/App";
import ProjectsSidebar from "src/_pages/ProjectDetails/Sidebar";
import ProjectApi from "src/api/Project";
import { FetchError } from "src/api/query.type";
import { useQueriesErrorBehavior } from "src/api/useQueriesError";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { SpaceBackground } from "components/features/space-background/space-background";

import { TClientLayout } from "./client-layout.types";

export function ClientLayout({ children }: TClientLayout.Props) {
  const { pathname } = useLocation();
  const isProjectEdition = !!matchPath(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Edit}`, pathname);
  const isProjectContributions = !!matchPath(
    `${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Contributions}`,
    pathname
  );

  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const { slug = "" } = useParams<{ slug: string }>();
  const { error, isError, refetch } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const errorHandlingComponent = useQueriesErrorBehavior({
    queries: {
      error: error as FetchError,
      isError,
      refetch,
    },
  });

  if (errorHandlingComponent) {
    return errorHandlingComponent;
  }

  return (
    // TODO NEXT : should be remove
    <div className="z-[1] flex h-[calc(100dvh)] w-screen flex-col xl:fixed">
      <div
        className="flex w-full flex-1 flex-col overflow-hidden border-[24px] border-t-0 border-black pt-4 xl:h-0 xl:flex-row xl:pt-0"
        style={{ boxSizing: "border-box" }}
      >
        <ProjectsSidebar />
        <Background
          roundedBorders={isXl ? BackgroundRoundedBorders.Right : BackgroundRoundedBorders.Full}
          innerClassName={cn(isXl ? "h-full" : "h-auto")}
        >
          <div
            className={cn(
              "mx-auto flex h-full flex-1 flex-col gap-6",
              {
                "max-w-7xl gap-6 px-4 py-6 xl:px-8": !isProjectEdition,
              },
              isProjectContributions ? "xl:pb-0" : ""
            )}
          >
            {children}
          </div>
        </Background>
      </div>
      {/*// TODO NEXT : should be remove*/}
      <SpaceBackground />
    </div>
  );
}
