import React, { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import ErrorTrigger from "src/_pages/ErrorTrigger";
import ImpersonationPage from "src/_pages/Impersonation";
import Loader from "src/components/Loader";
import { NotFound } from "src/components/NotFound";

import { AdminGuard } from "components/features/auth0/guards/admin-guard";

export enum RoutePaths {
  CatchAll = "*",
  Error = "/error",
  NotFound = "/not-found",
  Impersonation = "/impersonate/:userId",
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
      path: RoutePaths.Impersonation,
      element: (
        <AdminGuard>
          <ImpersonationPage />
        </AdminGuard>
      ),
    },
    {
      children: [
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
