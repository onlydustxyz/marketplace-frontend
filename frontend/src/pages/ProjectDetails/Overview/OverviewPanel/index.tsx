import { gql } from "@apollo/client";
import { uniqBy } from "lodash";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import isDefined from "src/utils/isDefined";
import { GetProjectContributorsForOverviewQuery, ProjectLeadFragment, SponsorFragment } from "src/__generated/graphql";
import OverviewPanelView from "./View";

interface OverviewPanelProps {
  leads?: ProjectLeadFragment[];
  totalSpentAmountInUsd?: number;
  sponsors: SponsorFragment[];
  telegramLink: string | null;
  projectId: string;
}

export default function OverviewPanel({ projectId, ...props }: OverviewPanelProps) {
  const getProjectContributorsForOverview = useHasuraQuery<GetProjectContributorsForOverviewQuery>(
    GET_PROJECT_CONTRIBUTORS_FOR_OVERVIEW_PANEL_QUERY,
    HasuraUserRole.Public,
    { variables: { projectId } }
  );

  const contributors = uniqBy(
    getProjectContributorsForOverview?.data?.projectsByPk?.githubRepos
      .map(githubRepo => githubRepo?.githubRepoDetails?.content?.contributors)
      .flat(),
    contributor => contributor?.login
  ).filter(isDefined);

  return <OverviewPanelView {...props} contributors={contributors} />;
}

export const PROJECT_LEAD_FRAGMENT = gql`
  fragment ProjectLead on users {
    displayName
    avatarUrl
  }
`;

export const SPONSOR_FRAGMENT = gql`
  fragment Sponsor on Sponsors {
    id
    name
    logoUrl
    url
  }
`;

export const GET_PROJECT_CONTRIBUTORS_FOR_OVERVIEW_PANEL_QUERY = gql`
  query GetProjectContributorsForOverview($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      githubRepos {
        githubRepoDetails {
          content {
            contributors {
              login
              avatarUrl
            }
          }
        }
      }
    }
  }
`;
