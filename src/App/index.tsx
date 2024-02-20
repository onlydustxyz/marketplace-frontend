import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import ErrorTrigger from "src/_pages/ErrorTrigger";
import Loader from "src/components/Loader";
import { NotFound } from "src/components/NotFound";

import ProjectsLoader from "./Loaders/ProjectsLoader";

const ProjectsPage = lazy(() => import("app/migration/projects/page"));

export enum RoutePaths {
  Projects = "/",
  ProjectDetailsEditRepos = "/p/:projectKey/edit?tab=Repos",
  CatchAll = "*",
  Error = "/error",
  NotFound = "/not-found",
}

export enum ProjectRoutePaths {
  Contributors = "contributors",
  Rewards = "rewards",
  Contributions = "contributions",
  Insights = "insights",
}

export enum ProjectRewardsRoutePaths {
  List = "",
  New = "new",
}

function App() {
  const routes = useRoutes([
    {
      children: [
        {
          path: RoutePaths.Projects,
          element: (
            <Suspense fallback={<ProjectsLoader />}>
              <ProjectsPage />
            </Suspense>
          ),
        },
        {
          path: RoutePaths.NotFound,
          element: <NotFound />,
        },
        {
          path: RoutePaths.CatchAll,
          element: <Navigate to={RoutePaths.NotFound} />,
        },
        {
          path: RoutePaths.Error,
          element: <ErrorTrigger />,
        },
      ],
    },
  ]);

  return (
    <Suspense
      fallback={
        <div className="h-[calc(100dvh)]">
          <Loader />
        </div>
      }
    >
      {routes}
    </Suspense>
  );
}

export default App;
