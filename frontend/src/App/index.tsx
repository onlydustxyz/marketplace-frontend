import { lazy, Suspense, useEffect } from "react";
import { RouteObject, useLocation, useRoutes } from "react-router-dom";

import Layout from "src/App/Layout";
import ProtectedRoute from "src/App/ProtectedRoute";

const Login = lazy(() => import("src/pages/Login"));
const Projects = lazy(() => import("src/pages/Projects"));
const Rewards = lazy(() => import("src/pages/Rewards"));
const ProjectDetails = lazy(() => import("src/pages/ProjectDetails"));
const ProjectDetailsOverview = lazy(() => import("src/pages/ProjectDetails/Overview"));
const ProjectDetailsContributors = lazy(() => import("src/pages/ProjectDetails/Contributors"));
const ProjectDetailsRewards = lazy(() => import("src/pages/ProjectDetails/Rewards"));
const ProjectDetailsRewardsList = lazy(() => import("src/pages/ProjectDetails/Rewards/List"));
const ProjectDetailsRewardForm = lazy(() => import("src/pages/ProjectDetails/Rewards/RewardForm"));

import { CustomUserRole, HasuraUserRole } from "src/types";
import LoaderFallback from "src/components/Loader";
import ErrorTrigger from "src/pages/ErrorTrigger";
import ImpersonationPage from "src/pages/Impersonation";
import TermsAndConditions from "src/pages/TermsAndConditions";
import Onboarding from "src/pages/Onboarding";
import useReloadOnNewRelease from "./useReloadOnNewRelease";
import PublicProfilePage from "src/pages/PublicProfile";
import { NotFound } from "src/components/NotFound";

export enum RoutePaths {
  Home = "/",
  Projects = "/",
  Login = "/login",
  ProjectDetails = "/p/:projectKey",
  Rewards = "/rewards",
  CatchAll = "*",
  Error = "/error",
  NotFound = "/not-found",
  Impersonation = "/impersonate/:userId",
  TermsAndConditions = "/terms-and-conditions",
  Onboarding = "/onboarding",
  PublicProfile = "/u/:userLogin",
}

export enum ProjectRoutePaths {
  Overview = "",
  Contributors = "contributors",
  Rewards = "rewards",
}

export enum ProjectRewardsRoutePaths {
  List = "",
  New = "new",
}

function App() {
  const location = useLocation();
  const reloadOnNewRelease = useReloadOnNewRelease();

  useEffect(() => {
    reloadOnNewRelease();
  }, [location]);

  const projectRoutes: RouteObject[] = [
    {
      index: true,
      element: <ProjectDetailsOverview />,
    },
    {
      path: ProjectRoutePaths.Contributors,
      element: <ProjectDetailsContributors />,
    },
    {
      path: ProjectRoutePaths.Rewards,
      element: (
        <ProtectedRoute requiredRole={CustomUserRole.ProjectLead}>
          <ProjectDetailsRewards />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <ProjectDetailsRewardsList />,
        },
        {
          path: ProjectRewardsRoutePaths.New,
          element: <ProjectDetailsRewardForm />,
        },
      ],
    },
  ];
  const routes = useRoutes([
    {
      path: RoutePaths.Impersonation,
      element: <ImpersonationPage />,
    },
    {
      path: RoutePaths.PublicProfile,
      element: <PublicProfilePage />,
    },

    {
      element: <Layout />,
      children: [
        {
          path: RoutePaths.Projects,
          element: <Projects />,
        },
        {
          path: RoutePaths.TermsAndConditions,
          element: <TermsAndConditions />,
        },
        {
          path: RoutePaths.Onboarding,
          element: <Onboarding />,
        },
        {
          path: RoutePaths.Rewards,
          element: (
            <ProtectedRoute requiredRole={HasuraUserRole.RegisteredUser}>
              <Rewards />
            </ProtectedRoute>
          ),
        },
        {
          path: RoutePaths.Login,
          element: <Login />,
        },
        {
          path: RoutePaths.ProjectDetails,
          element: <ProjectDetails />,
          children: projectRoutes,
        },
        {
          path: RoutePaths.NotFound,
          element: <NotFound />,
        },
        {
          path: RoutePaths.CatchAll,
          element: <NotFound />,
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
          <LoaderFallback />
        </div>
      }
    >
      {routes}
    </Suspense>
  );
}

export default App;
