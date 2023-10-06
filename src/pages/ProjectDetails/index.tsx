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
import { ReactNode, useContext } from "react";
import { DataContext } from "src/App/DataWrapper/DataContext";
import { useSuspenseQuery_experimental as useSuspenseQuery } from "@apollo/client";
import { GetProjectIdFromKeyDocument, GetProjectIdFromKeyQuery } from "src/__generated/graphql";
import { contextWithCacheHeaders } from "src/utils/headers";
import DataDisplay from "src/App/DataWrapper/DataDisplay";

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

export interface ProjectDetailsRESTfull {
  name: string | null;
  shortDescription: string | null;
  id: string;
  key: string | null;
}

interface ProjectDetailsDataWrapperProps {
  children: ReactNode;
  param?: string;
}

function ProjectDetailsDataWrapper({ children, param }: ProjectDetailsDataWrapperProps) {
  const projectIdQuery = useSuspenseQuery<GetProjectIdFromKeyQuery>(GetProjectIdFromKeyDocument, {
    variables: { projectKey: param },
    ...contextWithCacheHeaders,
  });

  return (
    <DataDisplay param={param} data={projectIdQuery.data?.projects[0]}>
      {children}
    </DataDisplay>
  );
}

export default function ProjectDetails() {
  const { projectKey = "" } = useParams<ProjectDetailsParams>();

  return (
    <DataSwitch param={projectKey} ApolloDataWrapper={ProjectDetailsDataWrapper} resourcePath="/api/v1/projects/slug/">
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

  const { param, data, loading, error } = dataContext;
  const projectKey = param;
  const { id, name } = data as ProjectDetailsRESTfull;

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
      <View projectId={id} projectKey={projectKey} loading={loading} error={error} />
    </>
  );
}
