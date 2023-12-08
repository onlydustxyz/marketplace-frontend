import { lazy, Suspense } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import Layout from "src/App/Layout";
import ProtectedRoute from "src/App/ProtectedRoute";

const Login = lazy(() => import("src/pages/Login"));
const Projects = lazy(() => import("src/pages/Projects"));
const Contributions = lazy(() => import("src/pages/Contributions/Contributions"));
const Rewards = lazy(() => import("src/pages/Rewards"));
const ProjectDetails = lazy(() => import("src/pages/ProjectDetails"));
const ProjectDetailsOverview = lazy(() => import("src/pages/ProjectDetails/Overview"));
const ProjectDetailsContributors = lazy(() => import("src/pages/ProjectDetails/Contributors"));
const ProjectDetailsRewards = lazy(() => import("src/pages/ProjectDetails/Rewards"));
const ProjectDetailsRewardsList = lazy(() => import("src/pages/ProjectDetails/Rewards/List"));
const ProjectDetailsRewardForm = lazy(() => import("src/pages/ProjectDetails/Rewards/RewardForm"));
const ProjectDetailsEdit = lazy(() => import("src/pages/ProjectDetails/ProjectEdition/ProjectEdition"));

import { NotFound } from "src/components/NotFound";
import ErrorTrigger from "src/pages/ErrorTrigger";
import ImpersonationPage from "src/pages/Impersonation";
import Onboarding from "src/pages/Onboarding";
import PublicProfilePage from "src/pages/PublicProfile";
import TermsAndConditions from "src/pages/TermsAndConditions";
import { CustomUserRole, HasuraUserRole } from "src/types";
import { parseFlag } from "src/utils/parseFlag";
import GithubCallbackHandler from "src/pages/Callbacks/GithubCallbackHandler";
import ProjectCreation from "src/pages/ProjectCreation/ProjectCreation";
import ProtectedByFlag from "./ProtectedByFlag";
import ProtectedByGithub from "./ProtectedByGithub";
import { GITHUB_PERMISSIONS } from "src/hooks/useGithubUserPermissions/useGithubUserPermissions";
import Skeleton from "src/components/Skeleton";
import ProjectsLoader from "./Loaders/ProjectsLoader";
import ProjectDetailsLoader from "./Loaders/ProjectDetailLoader";
import Loader from "src/components/Loader";

export enum RoutePaths {
  Home = "/",
  Projects = "/",
  Login = "/login",
  ProjectCreation = "/p/create",
  ProjectDetails = "/p/:projectKey",
  ProjectDetailsEdit = "/p/:projectKey/edit",
  ProjectDetailsEditRepos = "/p/:projectKey/edit?tab=Repos",
  Rewards = "/rewards",
  CatchAll = "*",
  Error = "/error",
  NotFound = "/not-found",
  Impersonation = "/impersonate/:userId",
  TermsAndConditions = "/terms-and-conditions",
  Onboarding = "/onboarding",
  PublicProfile = "/u/:userLogin",
  Contributions = "/contributions",
  GithubCallbacks = "/github-callbacks",
}

export enum ProjectRoutePaths {
  Overview = "",
  Contributors = "contributors",
  Rewards = "rewards",
  Edit = "edit",
}

export enum ProjectRewardsRoutePaths {
  List = "",
  New = "new",
}

function App() {
  const projectRoutes: RouteObject[] = [
    {
      index: true,
      element: (
        <Suspense fallback={<Skeleton variant="projectOverview" />}>
          <ProjectDetailsOverview />
        </Suspense>
      ),
    },
    {
      path: ProjectRoutePaths.Contributors,
      element: (
        <Suspense
          fallback={
            <>
              <div className="max-w-[15%]">
                <Skeleton variant="counter" />
              </div>
              <Skeleton variant="contributorList" />
            </>
          }
        >
          <ProjectDetailsContributors />
        </Suspense>
      ),
    },
    {
      path: ProjectRoutePaths.Rewards,
      element: (
        <ProtectedRoute requiredRole={CustomUserRole.ProjectLead}>
          <Suspense fallback={<Skeleton variant="projectRewards" />}>
            <ProjectDetailsRewards />
          </Suspense>
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Skeleton variant="projectRewards" />}>
              <ProjectDetailsRewardsList />
            </Suspense>
          ),
        },
        {
          path: ProjectRewardsRoutePaths.New,
          element: (
            <Suspense fallback={<Skeleton variant="projectRewardForm" />}>
              <ProjectDetailsRewardForm />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: ProjectRoutePaths.Edit,
      element: (
        <ProtectedRoute requiredRole={CustomUserRole.ProjectLead}>
          <ProtectedByFlag flag="VITE_CAN_EDIT_PROJECT">
            <ProtectedByGithub requiredPermission={GITHUB_PERMISSIONS.READ_ORG} redirectTo={RoutePaths.ProjectDetails}>
              <ProjectDetailsEdit />
            </ProtectedByGithub>
          </ProtectedByFlag>
        </ProtectedRoute>
      ),
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
          element: (
            <Suspense fallback={<ProjectsLoader />}>
              <Projects />
            </Suspense>
          ),
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
              <Suspense
                fallback={
                  <div className="h-full">
                    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 xl:p-8">
                      <Skeleton variant="title" />
                      <Skeleton variant="invoice" />
                      <Skeleton variant="earnedRewards" />
                      <Skeleton variant="rewards" />
                    </div>
                  </div>
                }
              >
                <Rewards />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        parseFlag("VITE_FLAG_ALLOW_CONTRIBUTIONS_LIST")
          ? {
              path: RoutePaths.Contributions,
              element: (
                <ProtectedRoute requiredRole={HasuraUserRole.RegisteredUser}>
                  <Contributions />
                </ProtectedRoute>
              ),
            }
          : {},
        {
          path: RoutePaths.Login,
          element: <Login />,
        },
        {
          path: RoutePaths.ProjectCreation,
          element: (
            <ProtectedRoute requiredRole={HasuraUserRole.RegisteredUser}>
              <ProtectedByFlag flag="VITE_CAN_CREATE_PROJECT">
                <ProtectedByGithub
                  requiredPermission={GITHUB_PERMISSIONS.READ_ORG}
                  redirectTo={RoutePaths.ProjectCreation}
                >
                  <ProjectCreation />
                </ProtectedByGithub>
              </ProtectedByFlag>
            </ProtectedRoute>
          ),
        },
        {
          path: RoutePaths.ProjectDetails,
          element: (
            <Suspense fallback={<ProjectDetailsLoader />}>
              <ProjectDetails />
            </Suspense>
          ),
          children: projectRoutes,
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
        {
          path: RoutePaths.GithubCallbacks,
          element: <GithubCallbackHandler />,
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
