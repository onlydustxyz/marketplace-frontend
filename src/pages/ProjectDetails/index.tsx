import { Navigate, matchPath, useLocation, useParams } from "react-router-dom";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import ErrorFallback from "src/ErrorFallback";
import ProjectApi from "src/api/Project";
import Loader from "src/components/Loader";
import SEO from "src/components/SEO";
import View from "./View";

export default function ProjectDetails() {
  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const { pathname } = useLocation();
  const isProjectEdition = !!matchPath(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Edit}`, pathname);

  const { data, isLoading, isError } = ProjectApi.queries.useDetails({ params: { projectKey } });

  if (isLoading) {
    // TODO Replace with skeleton component
    return <Loader />;
  }

  if (isError) {
    return <ErrorFallback />;
  }

  if (!data) {
    return <Navigate to={RoutePaths.NotFound} />;
  }

  return (
    <>
      <SEO title={`${data.name} — OnlyDust`} />
      <View project={data} loading={isLoading} error={isError} padded={!isProjectEdition} />
    </>
  );
}
