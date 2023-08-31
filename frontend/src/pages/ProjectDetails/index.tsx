import { Navigate, useNavigate, useParams } from "react-router-dom";
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
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import { contextWithCacheHeaders } from "src/utils/headers";
import SEO from "src/components/SEO";

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
  const { projectKey = "" } = useParams<ProjectDetailsParams>();

  const projectIdQuery = useSuspenseQuery<GetProjectIdFromKeyQuery>(GetProjectIdFromKeyDocument, {
    variables: { projectKey },
    ...contextWithCacheHeaders,
  });
  const project = projectIdQuery.data.projects[0];

  if (!project) {
    return <Navigate to={RoutePaths.NotFound} />;
  }

  return <ProjectPresentDetails projectKey={projectKey} {...project} />;
}

function ProjectPresentDetails({
  projectKey,
  id: projectId,
  name,
}: {
  projectKey: string;
  id: string;
  name: string | null;
  shortDescription: string | null;
}) {
  const { visibleToCurrentUser } = useProjectVisibility(projectId);
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const navigate = useNavigate();

  if (!projectId || visibleToCurrentUser === false) {
    showToaster(T("project.error.notFound"), { isError: true });
    navigate(RoutePaths.Projects);
  }

  return (
    <>
      <SEO title={`${name} — OnlyDust`} />
      <View projectId={projectId} projectKey={projectKey} />
    </>
  );
}
