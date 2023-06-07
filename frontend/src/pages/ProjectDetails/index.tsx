import { Navigate, useParams } from "react-router-dom";
import { LanguageMap } from "src/types";
import { ProjectLeadFragment, SponsorFragment } from "src/__generated/graphql";
import View from "./View";
import { RoutePaths } from "src/App";
import useProjectVisibility from "src/hooks/useProjectVisibility";

type ProjectDetailsParams = {
  projectId: string;
};

export interface ProjectDetails {
  id: string;
  name?: string;
  logoUrl: string;
  telegramLink?: string | null;
  leads: ({ id: string } & Partial<ProjectLeadFragment>)[];
  invitationId?: string;
  totalSpentAmountInUsd?: number;
  totalInitialAmountInUsd?: number;
  languages: LanguageMap;
  sponsors: SponsorFragment[];
}

export default function ProjectDetails() {
  const { projectId } = useParams<ProjectDetailsParams>();
  const { visibleToCurrentUser } = useProjectVisibility(projectId);

  return projectId && visibleToCurrentUser !== false ? (
    <View projectId={projectId} />
  ) : (
    <Navigate to={RoutePaths.Projects} />
  );
}
