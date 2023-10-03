import { useNavigate, useParams } from "react-router-dom";
import { LanguageMap } from "src/types";
import { ProjectLeadFragment, SponsorFragment } from "src/__generated/graphql";
import View from "./View";
import { RoutePaths } from "src/App";
import useProjectVisibility from "src/hooks/useProjectVisibility";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import SEO from "src/components/SEO";
import DataSwitch from "src/App/DataWrapper/DataSwitch";

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

interface Project {
  name: string | null;
  shortDescription: string | null;
  id: string;
  key: string | null;
}

interface ProjectPresentDetailsProps {
  projectKey: string;
  data: Project;
  isLoading: boolean;
  error: null | unknown;
}

export default function ProjectDetails() {
  const { projectKey = "" } = useParams<ProjectDetailsParams>();

  return (
    <DataSwitch projectKey={projectKey}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <ProjectPresentDetails />
    </DataSwitch>
  );
}

function ProjectPresentDetails({ projectKey, data, isLoading, error }: ProjectPresentDetailsProps) {
  const { id, name } = data;

  const { visibleToCurrentUser } = useProjectVisibility(id);
  const { T } = useIntl();
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
