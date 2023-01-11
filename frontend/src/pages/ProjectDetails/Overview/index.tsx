import Card from "src/components/Card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useIntl } from "src/hooks/useIntl";
import { buildGithubLink, buildLanguageString } from "src/utils/stringUtils";
import ProjectLead, { Lead } from "src/components/LeadContributor";
import { Contributor, LanguageMap } from "src/types";

interface OverviewProps extends React.PropsWithChildren {
  decodedReadme?: string;
  lead?: Lead | null;
  githubRepoInfo?: {
    owner?: string;
    name?: string;
    contributors?: Contributor[];
    languages: LanguageMap;
  };
}

export default function Overview({ decodedReadme, lead, githubRepoInfo, children }: OverviewProps) {
  const { T } = useIntl();
  return (
    <div className="flex flex-col gap-8 mt-3">
      <div className="text-3xl font-alfreda">{T("project.details.overview.title")}</div>
      {children}
      <div className="flex gap-5">
        {decodedReadme && (
          <div className="basis-3/4">
            <Card>
              <div className="font-medium text-lg pb-4">{T("project.details.overview.readmeTitle")}</div>
              <ReactMarkdown skipHtml={true} remarkPlugins={[[remarkGfm]]} className="prose lg:prose-l prose-invert">
                {decodedReadme}
              </ReactMarkdown>
            </Card>
          </div>
        )}
        <div className="basis-1/4">
          <Card>
            <div className="flex flex-col gap-3">
              {githubRepoInfo?.languages && (
                <OverviewPanelSection title={T("project.details.overview.technologies")}>
                  {buildLanguageString(githubRepoInfo.languages)}
                </OverviewPanelSection>
              )}
              {lead && (
                <OverviewPanelSection title={T("project.details.overview.projectLeader")}>
                  <ProjectLead {...lead} />
                </OverviewPanelSection>
              )}
              {githubRepoInfo?.contributors?.length && (
                <OverviewPanelSection title={T("project.details.overview.contributors")}>
                  {githubRepoInfo.contributors.length}
                </OverviewPanelSection>
              )}
              {githubRepoInfo?.owner && githubRepoInfo?.name && (
                <OverviewPanelSection title={T("project.details.overview.githubLinkTitle")}>
                  <a
                    href={buildGithubLink(githubRepoInfo.owner, githubRepoInfo.name)}
                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  >
                    {T("project.details.overview.githubLinkContent")}
                  </a>
                </OverviewPanelSection>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface OverviewPanelSectionProps extends React.PropsWithChildren {
  title: string;
}

function OverviewPanelSection({ title, children }: OverviewPanelSectionProps) {
  return (
    <div className="flex flex-col">
      <div className="flex text-lg font-bold">{title}</div>
      <div className="flex">{children}</div>
    </div>
  );
}
