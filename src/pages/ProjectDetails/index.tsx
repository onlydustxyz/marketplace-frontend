import { Navigate, useParams } from "react-router-dom";
import { Project } from "src/types";
import View from "./View";
import { RoutePaths } from "src/App";
import SEO from "src/components/SEO";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import ErrorFallback from "src/ErrorFallback";
import Loader from "src/components/Loader";

type ProjectDetailsParams = {
  projectKey: string;
};

export default function ProjectDetails() {
  const { projectKey = "" } = useParams<ProjectDetailsParams>();

  const { data, isLoading, isError } = useRestfulData({
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

  const { name } = data as Project;

  if (!data) {
    return <Navigate to={RoutePaths.NotFound} />;
  }

  return (
    <>
      <SEO title={`${name} — OnlyDust`} />
      <View project={data} loading={isLoading} error={isError} />
    </>
  );
}
