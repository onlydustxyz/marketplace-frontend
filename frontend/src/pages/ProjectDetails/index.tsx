import { useNavigate, useParams } from "react-router-dom";
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
import { Helmet } from "react-helmet";
import { contextWithCacheHeaders } from "src/utils/headers";

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
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const navigate = useNavigate();

  const projectIdQuery = useSuspenseQuery<GetProjectIdFromKeyQuery>(GetProjectIdFromKeyDocument, {
    variables: { projectKey },
    ...contextWithCacheHeaders,
  });
  const { id: projectId, name, shortDescription } = projectIdQuery.data.projects[0];

  const { visibleToCurrentUser } = useProjectVisibility(projectId);

  if (!projectId || visibleToCurrentUser === false) {
    showToaster(T("project.error.notFound"), { isError: true });
    navigate(RoutePaths.Projects);
  }

  return (
    <>
      <Helmet>
        <title>{`${name} — OnlyDust`}</title>
        <meta property="og:title" content={`${name} — OnlyDust`} />
        <meta property="og:description" content={shortDescription || ""} />
      </Helmet>
      <View projectId={projectId} projectKey={projectKey || ""} />
    </>
  );
}
