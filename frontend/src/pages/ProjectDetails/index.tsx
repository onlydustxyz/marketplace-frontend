import { Navigate, useParams } from "react-router-dom";
import { LanguageMap } from "src/types";
import {
  GetProjectIdFromKeyDocument,
  GetProjectIdFromKeyQuery,
  ProjectLeadFragment,
  SponsorFragment,
} from "src/__generated/graphql";
import View from "./View";
import { RoutePaths } from "src/App";
import useProjectVisibility from "src/hooks/useProjectVisibility";
import { useSuspenseQuery_experimental as useSuspenseQuery } from "@apollo/client";

type ProjectDetailsParams = {
  projectKey: string;
};

export interface ProjectDetails {
  id: string;
  name?: string;
  logoUrl: string;
  moreInfoLink?: string | null;
  leads: ({ id: string } & Partial<ProjectLeadFragment>)[];
  invitationId?: string;
  totalSpentAmountInUsd?: number;
  totalInitialAmountInUsd?: number;
  languages: LanguageMap;
  sponsors: SponsorFragment[];
}

export default function ProjectDetails() {
  const { projectKey } = useParams<ProjectDetailsParams>();

  const projectIdQuery = useSuspenseQuery<GetProjectIdFromKeyQuery>(GetProjectIdFromKeyDocument, {
    variables: { projectKey },
  });
  const projectId = projectIdQuery.data.projects[0]?.id;

  const { visibleToCurrentUser } = useProjectVisibility(projectId);

  return projectId && visibleToCurrentUser !== false ? (
    <View projectId={projectId} />
  ) : (
    <Navigate to={RoutePaths.Projects} />
  );
}
