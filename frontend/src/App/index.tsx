import { lazy, Suspense } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

import Layout from "src/App/Layout";
import ProtectedRoute from "src/App/ProtectedRoute";

const Login = lazy(() => import("src/pages/Login"));
const Projects = lazy(() => import("src/pages/Projects"));
const Profile = lazy(() => import("src/pages/Profile"));
const Payments = lazy(() => import("src/pages/Payments"));
const ProjectDetails = lazy(() => import("src/pages/ProjectDetails"));
const ProjectDetailsOverview = lazy(() => import("src/pages/ProjectDetails/Overview"));
const ProjectDetailsContributors = lazy(() => import("src/pages/ProjectDetails/Contributors"));
const ProjectDetailsPayments = lazy(() => import("src/pages/ProjectDetails/Payments"));
const ProjectDetailsPaymentsList = lazy(() => import("src/pages/ProjectDetails/Payments/List"));
const ProjectDetailsPaymentForm = lazy(() => import("src/pages/ProjectDetails/Payments/PaymentForm"));

import { CustomUserRole, HasuraUserRole } from "src/types";
import LoaderFallback from "src/components/Loader";
import ErrorTrigger from "src/pages/ErrorTrigger";
import ImpersonationPage from "src/pages/Impersonation";

export enum RoutePaths {
  Projects = "/",
  Login = "/login",
  Profile = "/profile",
  ProjectDetails = "/projects/:projectId",
  Payments = "/payments",
  CatchAll = "*",
  Error = "/error",
  Impersonation = "/impersonate/:userId",
}

export enum ProjectRoutePaths {
  Overview = "",
  Contributors = "contributors",
  Payments = "payments",
}

export enum ProjectPaymentsRoutePaths {
  List = "",
  New = "new",
}

function App() {
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
      path: ProjectRoutePaths.Payments,
      element: (
        <ProtectedRoute requiredRole={CustomUserRole.ProjectLead} redirectTo={RoutePaths.ProjectDetails}>
          <ProjectDetailsPayments />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <ProjectDetailsPaymentsList />,
        },
        {
          path: ProjectPaymentsRoutePaths.New,
          element: <ProjectDetailsPaymentForm />,
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
      element: <Layout />,
      children: [
        {
          path: RoutePaths.Projects,
          element: <Projects />,
        },
        {
          path: RoutePaths.Profile,
          element: (
            <ProtectedRoute requiredRole={HasuraUserRole.RegisteredUser}>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: RoutePaths.Payments,
          element: (
            <ProtectedRoute requiredRole={HasuraUserRole.RegisteredUser}>
              <Payments />
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
          path: RoutePaths.CatchAll,
          element: <Projects />,
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
        <div className="h-screen">
          <LoaderFallback />
        </div>
      }
    >
      {routes}
    </Suspense>
  );
}

export default App;
