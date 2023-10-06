import { useNavigate, useParams } from "react-router-dom";
import { LanguageMap } from "src/types";
import { ProjectLeadFragment, SponsorFragment } from "src/__generated/graphql";
import View from "./View";
import { RoutePaths } from "src/components/App";
import useProjectVisibility from "src/hooks/useProjectVisibility";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import SEO from "src/components/SEO";
import DataSwitch from "src/components/App/DataWrapper/DataSwitch";
import { useContext } from "react";
import { DataContext } from "src/components/App/DataWrapper/DataContext";

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
  totalSpentamount?: number;
  totalInitialamount?: number;
  languages: LanguageMap;
  sponsors: SponsorFragment[];
}

export default function ProjectDetails() {
  const { projectKey = "" } = useParams<ProjectDetailsParams>();

  return (
    <DataSwitch projectKey={projectKey}>
      <ProjectPresentDetails />
    </DataSwitch>
  );
}

function ProjectPresentDetails() {
  const { T } = useIntl();
  const dataContext = useContext(DataContext);

  if (!dataContext) {
    throw new Error(T("dataFetching.dataContext"));
  }

  const { projectKey, data, isLoading, error } = dataContext;
  const { id, name } = data;

  const { visibleToCurrentUser } = useProjectVisibility(id);

  const showToaster = useShowToaster();
  const navigate = useNavigate();

  if (!id || visibleToCurrentUser === false) {
    showToaster(T("project.error.notFound"), { isError: true });
    navigate(RoutePaths.Projects);
  }

  return (
    <>
      <SEO title={`${name} — OnlyDust`} />
      <View projectId={id} projectKey={projectKey} isLoading={isLoading} error={error} />
    </>
  );
}
