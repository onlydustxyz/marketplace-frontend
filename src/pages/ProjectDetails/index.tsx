import { Navigate, matchPath, useLocation, useParams } from "react-router-dom";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import ErrorFallback from "src/ErrorFallback";
import { components } from "src/__generated/api";
import Loader from "src/components/Loader";
import SEO from "src/components/SEO";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import View from "./View";

type ProjectDetailsParams = {
  projectKey: string;
};

export default function ProjectDetails() {
  const { projectKey = "" } = useParams<ProjectDetailsParams>();
  const { pathname } = useLocation();
  const isProjectEdition = !!matchPath(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Edit}`, pathname);

  const { data, isLoading, isError } = useRestfulData<components["schemas"]["ProjectResponse"]>({
    resourcePath: ApiResourcePaths.GET_PROJECT_DETAILS_SLUG,
    pathParam: projectKey,
    method: "GET",
  });

  if (isLoading) {
    // TODO Replace with skeleton component
    return <Loader />;
  }

  if (isError) {
    return <ErrorFallback />;
  }

  const { name } = data as components["schemas"]["ProjectResponse"];

  if (!data) {
    return <Navigate to={RoutePaths.NotFound} />;
  }

  return (
    <>
      <SEO title={`${name} — OnlyDust`} />
      <View project={data} loading={isLoading} error={isError} padded={!isProjectEdition} />
    </>
  );
}
