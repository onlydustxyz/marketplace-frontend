import React, { Suspense, lazy } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import SettingsLayout from "app/migration/settings/layout";

import Layout from "src/App/Layout";
import GithubCallbackHandler from "src/_pages/Callbacks/GithubCallbackHandler";
import ErrorTrigger from "src/_pages/ErrorTrigger";
import ImpersonationPage from "src/_pages/Impersonation";
import Onboarding from "src/_pages/Onboarding";
import ProjectCreation from "src/_pages/ProjectCreation/ProjectCreation";
import InsightSkeleton from "src/_pages/ProjectDetails/Insights/Insights.skeleton";
import PublicProfilePage from "src/_pages/PublicProfile";
import TermsAndConditions from "src/_pages/TermsAndConditions";
import Loader from "src/components/Loader";
import { NotFound } from "src/components/NotFound";
import Skeleton from "src/components/Skeleton";

import { AdminGuard } from "components/features/auth0/guards/admin-guard";
import AuthenticationGuard from "components/features/auth0/guards/authentication-guard";
import { LeadGuard } from "components/features/auth0/guards/lead-guard";

import ProjectDetailsLoader from "./Loaders/ProjectDetailLoader";
import ProjectsLoader from "./Loaders/ProjectsLoader";
import RewardLoader from "./Loaders/RewardsLoader";
import ProtectedByFlag from "./ProtectedByFlag";

const ProjectsPage = lazy(() => import("app/migration/projects/page"));
const Rewards = lazy(() => import("src/_pages/Rewards"));
const ProjectDetails = lazy(() => import("src/_pages/ProjectDetails"));
const ProjectDetailsOverview = lazy(() => import("src/_pages/ProjectDetails/Overview"));
const ProjectDetailsContributors = lazy(() => import("src/_pages/ProjectDetails/Contributors"));
const ProjectDetailsContributions = lazy(() => import("src/_pages/ProjectDetails/Contributions"));
const ProjectDetailsRewardsList = lazy(() => import("src/_pages/ProjectDetails/Rewards/List"));
const ProjectDetailsRewardForm = lazy(() => import("src/_pages/ProjectDetails/Rewards/RewardForm"));
const ProjectDetailsInsights = lazy(() => import("src/_pages/ProjectDetails/Insights"));
const ProjectDetailsEdit = lazy(() => import("src/_pages/ProjectDetails/ProjectEdition/ProjectEdition"));

export enum RoutePaths {
  Projects = "/",
  ProjectCreation = "/p/create",
  ProjectDetails = "/p/:projectKey",
  ProjectDetailsEdit = "/p/:projectKey/edit",
  ProjectDetailsEditRepos = "/p/:projectKey/edit?tab=Repos",
  Rewards = "/rewards",
  Settings = "/settings",
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
  Insights = "insights",
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
      path: ProjectRoutePaths.Contributions,
      element: <ProjectDetailsContributions />,
    },
    {
      path: ProjectRoutePaths.Rewards,
      children: [
        {
          index: true,
          element: (
            <AuthenticationGuard>
              <LeadGuard>
                <Suspense fallback={<Skeleton variant="projectRewards" />}>
                  <ProjectDetailsRewardsList />
                </Suspense>
              </LeadGuard>
            </AuthenticationGuard>
          ),
        },
        {
          path: ProjectRewardsRoutePaths.New,
          element: (
            <AuthenticationGuard>
              <LeadGuard>
                <Suspense fallback={<Skeleton variant="projectRewardForm" />}>
                  <ProjectDetailsRewardForm />
                </Suspense>
              </LeadGuard>
            </AuthenticationGuard>
          ),
        },
      ],
    },
    {
      path: ProjectRoutePaths.Insights,
      element: (
        <AuthenticationGuard>
          <LeadGuard>
            <ProtectedByFlag isValid={process.env.NEXT_PUBLIC_FLAG_ALLOW_PROJECT_INSIGHTS === "true"}>
              <Suspense fallback={<InsightSkeleton />}>
                <ProjectDetailsInsights />
              </Suspense>
            </ProtectedByFlag>
          </LeadGuard>
        </AuthenticationGuard>
      ),
    },
    {
      path: ProjectRoutePaths.Edit,
      element: (
        <AuthenticationGuard>
          <LeadGuard>
            <ProjectDetailsEdit />
          </LeadGuard>
        </AuthenticationGuard>
      ),
    },
  ];
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
              <ProjectsPage />
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
            <AuthenticationGuard>
              <Suspense fallback={<RewardLoader />}>
                <Rewards />
              </Suspense>
            </AuthenticationGuard>
          ),
        },
        {
          path: `${RoutePaths.Settings}/*`,
          element: (
            <AuthenticationGuard>
              <SettingsLayout />
            </AuthenticationGuard>
          ),
        },
        {
          path: RoutePaths.ProjectCreation,
          element: (
            <AuthenticationGuard>
              <ProjectCreation />
            </AuthenticationGuard>
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
