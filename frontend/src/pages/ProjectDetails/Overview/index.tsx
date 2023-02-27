import Card from "src/components/Card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useIntl } from "src/hooks/useIntl";
import OverviewPanel from "./OverviewPanel";
import { useOutletContext } from "react-router-dom";
import { ReactNode } from "react";
import { ProjectLeadFragment, SponsorFragment } from "src/__generated/graphql";

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
        <OverviewPanel {...{ leads, totalSpentAmountInUsd, projectId, sponsors, telegramLink }} />
      </div>
    </div>
  );
};

export default Overview;
