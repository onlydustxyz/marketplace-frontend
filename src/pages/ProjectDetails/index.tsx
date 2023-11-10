import { Navigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import ErrorFallback from "src/ErrorFallback";
import { components } from "src/__generated/api";
import Loader from "src/components/Loader";
import SEO from "src/components/SEO";
import View from "./View";
import ProjectApi from "src/api/Project";

type ProjectDetailsParams = {
  projectKey: string;
};

export default function ProjectDetails() {
  const { projectKey = "" } = useParams<ProjectDetailsParams>();

  const { data, isLoading, isError } = ProjectApi.queries.useGetProjectBySlug({ params: { slug: projectKey } });

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
      <View project={data} loading={isLoading} error={isError} />
    </>
  );
}
