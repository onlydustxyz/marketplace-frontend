import Card from "src/components/Card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useIntl } from "src/hooks/useIntl";
import { Lead } from "src/components/LeadContributor";
import { Contributor, LanguageMap } from "src/types";
import OverviewPanel from "./OverviewPanel";

interface OverviewProps extends React.PropsWithChildren {
  decodedReadme?: string;
  lead?: Lead | null;
  totalSpentAmountInUsd?: number;
  githubRepoInfo?: {
    owner?: string;
    name?: string;
    contributors?: Contributor[];
    languages: LanguageMap;
  };
}

export default function Overview({
  decodedReadme,
  lead,
  totalSpentAmountInUsd,
  githubRepoInfo,
  children,
}: OverviewProps) {
  const { T } = useIntl();
  return (
    <div className="flex flex-col gap-8 mt-3">
      <div className="text-3xl font-alfreda">{T("project.details.overview.title")}</div>
      {children}
      <div className="flex flex-row gap-5">
        {decodedReadme && (
          <div className="w-7/12">
            <Card>
              <div className="font-medium text-lg pb-4">{T("project.details.overview.readmeTitle")}</div>
              <ReactMarkdown skipHtml={true} remarkPlugins={[[remarkGfm]]} className="prose lg:prose-l prose-invert">
                {decodedReadme}
              </ReactMarkdown>
            </Card>
          </div>
        )}
        <Card className="h-fit p-0">
          <OverviewPanel {...{ lead, githubRepoInfo, totalSpentAmountInUsd }} />
        </Card>
      </div>
    </div>
  );
}
