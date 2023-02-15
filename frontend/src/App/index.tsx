import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouteObject, useRoutes } from "react-router-dom";

import Layout from "src/components/Layout";
import ProtectedRoute from "src/components/ProtectedRoute";
import ErrorFallback from "src/components/ErrorFallback";

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

import { HasuraUserRole } from "src/types";
import LoaderFallback from "src/components/Loader";
import ScrollToTop from "src/components/ScrollToTop";
import ErrorTrigger from "src/pages/ErrorTrigger";

export enum RoutePaths {
  Projects = "/",
  Login = "/login",
  Profile = "/profile",
  ProjectDetails = "/projects/:projectId",
  Payments = "/payments",
  CatchAll = "*",
  Error = "/error",
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
      element: <ProjectDetailsPayments />,
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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="h-screen">
            <LoaderFallback />
          </div>
        }
      >
        {routes}
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
