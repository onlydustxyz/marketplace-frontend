import { Navigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
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

  if (!data) {
    return <Navigate to={RoutePaths.NotFound} />;
  }

  const { name } = data;

  return (
    <>
      <SEO title={`${name} — OnlyDust`} />
      <View project={data} loading={isLoading} error={isError} />
    </>
  );
}
