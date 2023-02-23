import Card from "src/components/Card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useIntl } from "src/hooks/useIntl";
import OverviewPanel from "./OverviewPanel";
import { useOutletContext } from "react-router-dom";
import { ReactNode } from "react";
import { GetProjectContributorsForOverviewQuery, ProjectLeadFragment, SponsorFragment } from "src/__generated/graphql";
import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { uniqBy } from "lodash";
import isDefined from "src/utils/isDefined";

type OutletContext = {
  leads?: ProjectLeadFragment[];
  totalSpentAmountInUsd: number;
  githubRepoInfo: {
    decodedReadme?: string;
  };
  projectId: string;
  sponsors: SponsorFragment[];
  telegramLink: string | null;
  children: ReactNode;
};

const Overview: React.FC = () => {
  const { T } = useIntl();
  const { leads, totalSpentAmountInUsd, githubRepoInfo, sponsors, telegramLink, children, projectId } =
    useOutletContext<OutletContext>();

  const getProjectContributorsForOverview = useHasuraQuery<GetProjectContributorsForOverviewQuery>(
    GET_PROJECT_CONTRIBUTORS_FOR_OVERVIEW_QUERY,
    HasuraUserRole.Public,
    { variables: { projectId } }
  );

  const contributors = uniqBy(
    getProjectContributorsForOverview?.data?.projectsByPk?.githubRepos
      .map(githubRepo => githubRepo?.githubRepoDetails?.content?.contributors)
      .flat(),
    contributor => contributor?.login
  ).filter(isDefined);

  return (
    <div className="flex flex-col gap-8 mt-3">
      <div className="text-3xl font-belwe">{T("project.details.overview.title")}</div>
      {children}
      <div className="flex flex-row gap-5">
        {githubRepoInfo?.decodedReadme && (
          <div className="flex-1">
            <Card>
              <div className="font-medium text-lg pb-4">{T("project.details.overview.readmeTitle")}</div>
              <ReactMarkdown skipHtml={true} remarkPlugins={[[remarkGfm]]} className="prose lg:prose-l prose-invert">
                {githubRepoInfo.decodedReadme}
              </ReactMarkdown>
            </Card>
          </div>
        )}
        <OverviewPanel {...{ leads, contributors, totalSpentAmountInUsd, sponsors, telegramLink }} />
      </div>
    </div>
  );
};

export const GET_PROJECT_CONTRIBUTORS_FOR_OVERVIEW_QUERY = gql`
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

export default Overview;
