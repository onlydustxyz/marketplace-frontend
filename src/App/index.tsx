import { lazy, Suspense } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import Layout from "src/App/Layout";
import ProtectedRoute from "src/App/ProtectedRoute";

const Login = lazy(() => import("src/_pages/Login"));
const Projects = lazy(() => import("src/_pages/Projects"));
const Contributions = lazy(() => import("src/_pages/Contributions/Contributions"));
const Rewards = lazy(() => import("src/_pages/Rewards"));
const ProjectDetails = lazy(() => import("src/_pages/ProjectDetails"));
const ProjectDetailsOverview = lazy(() => import("src/_pages/ProjectDetails/Overview"));
const ProjectDetailsContributors = lazy(() => import("src/_pages/ProjectDetails/Contributors"));
const ProjectDetailsContributions = lazy(() => import("src/_pages/ProjectDetails/Contributions"));
const ProjectDetailsRewardsList = lazy(() => import("src/_pages/ProjectDetails/Rewards/List"));
const ProjectDetailsRewardForm = lazy(() => import("src/_pages/ProjectDetails/Rewards/RewardForm"));
const ProjectDetailsEdit = lazy(() => import("src/_pages/ProjectDetails/ProjectEdition/ProjectEdition"));

import { NotFound } from "src/components/NotFound";
import ErrorTrigger from "src/_pages/ErrorTrigger";
import ImpersonationPage from "src/_pages/Impersonation";
import Onboarding from "src/_pages/Onboarding";
import PublicProfilePage from "src/_pages/PublicProfile";
import TermsAndConditions from "src/_pages/TermsAndConditions";
import { CustomUserRole, HasuraUserRole } from "src/types";
import GithubCallbackHandler from "src/_pages/Callbacks/GithubCallbackHandler";
import ProjectCreation from "src/_pages/ProjectCreation/ProjectCreation";
import ProtectedByGithub from "./ProtectedByGithub";
import { GITHUB_PERMISSIONS } from "src/hooks/useGithubUserPermissions/useGithubUserPermissions";
import Skeleton from "src/components/Skeleton";
import ProjectsLoader from "./Loaders/ProjectsLoader";
import ProjectDetailsLoader from "./Loaders/ProjectDetailLoader";
import Loader from "src/components/Loader";
import RewardLoader from "./Loaders/RewardsLoader";

export enum RoutePaths {
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
  Contributions = "contributions",
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
    process.env.NEXT_PUBLIC_FLAG_ALLOW_PROJECT_CONTRIBUTIONS === "true"
      ? {
          path: ProjectRoutePaths.Contributions,
          element: <ProjectDetailsContributions />,
        }
      : {},
    {
      path: ProjectRoutePaths.Rewards,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute requiredRole={CustomUserRole.ProjectLead}>
              <Suspense fallback={<Skeleton variant="projectRewards" />}>
                <ProjectDetailsRewardsList />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: ProjectRewardsRoutePaths.New,
          element: (
            <ProtectedRoute requiredRole={CustomUserRole.ProjectLead}>
              <Suspense fallback={<Skeleton variant="projectRewardForm" />}>
                <ProjectDetailsRewardForm />
              </Suspense>
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: ProjectRoutePaths.Edit,
      element: (
        <ProtectedRoute requiredRole={CustomUserRole.ProjectLead}>
          <ProtectedByGithub requiredPermission={GITHUB_PERMISSIONS.READ_ORG} redirectTo={RoutePaths.ProjectDetails}>
            <ProjectDetailsEdit />
          </ProtectedByGithub>
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
              <Suspense fallback={<RewardLoader />}>
                <Rewards />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: RoutePaths.Contributions,
          element: (
            <ProtectedRoute requiredRole={HasuraUserRole.RegisteredUser}>
              <Contributions />
            </ProtectedRoute>
          ),
        },
        {
          path: RoutePaths.Login,
          element: <Login />,
        },
        {
          path: RoutePaths.ProjectCreation,
          element: (
            <ProtectedRoute requiredRole={HasuraUserRole.RegisteredUser}>
              <ProtectedByGithub
                requiredPermission={GITHUB_PERMISSIONS.READ_ORG}
                redirectTo={RoutePaths.ProjectCreation}
              >
                <ProjectCreation />
              </ProtectedByGithub>
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
