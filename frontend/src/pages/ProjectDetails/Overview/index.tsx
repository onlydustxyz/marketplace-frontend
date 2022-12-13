import Card from "src/components/Card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useIntl } from "src/hooks/useIntl";

interface OverviewProps {
  decodedReadme: string;
  contributors: any[];
  repo: {
    name: string;
    owner: string;
  };
}

export default function Overview({ decodedReadme, contributors, repo }: OverviewProps) {
  const { T } = useIntl();
  return (
    <div className="flex flex-row items-start gap-5">
      <div className="flex w-3/4">
        <Card>
          <ReactMarkdown skipHtml={true} remarkPlugins={[[remarkGfm]]} className="prose lg:prose-xl prose-invert">
            {decodedReadme}
          </ReactMarkdown>
        </Card>
      </div>
      <div className="flex w-1/4">
        <Card>
          <div className="flex flex-col gap-3">
            <OverviewPanelSection title={T("project.details.overview.technologies")}>Cairo</OverviewPanelSection>
            <OverviewPanelSection title={T("project.details.overview.projectLeader")}>
              {contributors[0].login}
            </OverviewPanelSection>
            <OverviewPanelSection title={T("project.details.overview.contributors")}>
              {contributors.length}
            </OverviewPanelSection>
            <OverviewPanelSection title={T("project.details.overview.githubLinkTitle")}>
              <a
                href={buildGithubRepoUrl(repo.owner, repo.name)}
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              >
                {T("project.details.overview.githubLinkContent")}
              </a>
            </OverviewPanelSection>
          </div>
        </Card>
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

function buildGithubRepoUrl(owner: string, name: string) {
  return `github.com/${owner}/${name}`;
}
