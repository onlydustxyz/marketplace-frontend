import { meApiClient } from "api-client/resources/me";
import { useParams } from "next/navigation";

import { TProject } from "app/c/[committeeId]/jury/features/project/project.types";

export function Project({ projectId }: TProject.Props) {
  const { committeeId } = useParams();

  const { data, isLoading, isError } = meApiClient.queries.useGetMyCommitteeAssignmentProject(
    typeof committeeId === "string" ? committeeId : "",
    projectId
  );

  if (isError || !data) {
    // TODO
    return "Failed";
  }

  if (isLoading) {
    // TODO
    return "Loading";
  }

  return <div></div>;
}
