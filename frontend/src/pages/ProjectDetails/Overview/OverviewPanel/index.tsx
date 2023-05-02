import { gql } from "@apollo/client";
import { uniqBy } from "lodash";
import isDefined from "src/utils/isDefined";
import {
  ProjectLeadFragment,
  SponsorFragment,
  useGetProjectContributorsForOverviewQuery,
} from "src/__generated/graphql";
import OverviewPanelView from "./View";
import { contextWithCacheHeaders } from "src/utils/headers";

interface OverviewPanelProps {
  leads?: ProjectLeadFragment[];
  totalSpentAmountInUsd?: number;
  totalInitialAmountInUsd?: number;
  sponsors: SponsorFragment[];
  telegramLink: string | null;
  projectId: string;
}

export default function OverviewPanel({ projectId, ...props }: OverviewPanelProps) {
  const getProjectContributorsForOverview = useGetProjectContributorsForOverviewQuery({
    variables: { projectId },
    ...contextWithCacheHeaders,
  });

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
    id
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
      id
      githubRepos {
        projectId
        githubRepoId
        githubRepoDetails {
          id
          content {
            id
            contributors {
              id
              login
              avatarUrl
            }
          }
        }
      }
    }
  }
`;
