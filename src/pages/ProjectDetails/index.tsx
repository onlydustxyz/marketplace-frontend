import { Navigate, matchPath, useLocation, useParams } from "react-router-dom";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import ErrorFallback from "src/ErrorFallback";
import ProjectApi from "src/api/Project";
import Loader from "src/components/Loader";
import SEO from "src/components/SEO";
import View from "./View";
import { HttpStatusStrings } from "src/api/query.utils";
import { FetchError } from "src/api/query.type";

export default function ProjectDetails() {
  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const { pathname } = useLocation();
  const isProjectEdition = !!matchPath(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Edit}`, pathname);
  const { data, isLoading, isError, error } = ProjectApi.queries.useGetProjectBySlug({ params: { slug: projectKey } });

  if (isLoading) {
    // TODO Replace with skeleton component
    return <Loader />;
  }

  if (isError && error instanceof Error && "errorType" in error) {
    const typedError = error as FetchError;

    if (typedError.errorType === HttpStatusStrings.NOT_FOUND) {
      return <Navigate to={RoutePaths.NotFound} />;
    }
    return <ErrorFallback />;
  }

  return data ? (
    <>
      <SEO title={`${data.name} — OnlyDust`} />
      <View project={data} loading={isLoading} error={isError} padded={!isProjectEdition} />
    </>
  ) : null;
}
