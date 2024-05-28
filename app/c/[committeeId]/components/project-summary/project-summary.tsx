import { TProjectSummary } from "app/c/[committeeId]/components/project-summary/project-summary.types";

import { useStackProjectOverview } from "src/App/Stacks/Stacks";
import MarkdownPreview from "src/components/MarkdownPreview";

import { Avatar } from "components/ds/avatar/avatar";
import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Tag } from "components/ds/tag/tag";
import { Contributor } from "components/features/contributor/contributor";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function ProjectSummary({ project }: TProjectSummary.Props) {
  const [openProjectOverview] = useStackProjectOverview();

  function handleViewProject() {
    openProjectOverview({ slug: project?.slug });
  }

  if (!project) return null;

  return (
    <Card className={"grid gap-4 shadow-light"}>
      <header className={"flex gap-4"}>
        <Avatar src={project.logoUrl} size={"2xl"} shape={"square"} isBordered={false} />

        <div className={"grid flex-1 gap-2"}>
          <div className={"flex items-center justify-between gap-2 overflow-hidden"}>
            <Typography variant={"title-m"} className={"truncate"}>
              {project.name}
            </Typography>

            <Button
              type={"button"}
              size="s"
              variant="secondary"
              iconOnly
              className="h-8 w-8 rounded-xl p-2"
              onClick={handleViewProject}
            >
              <Icon remixName={"ri-eye-line"} size={16} />
            </Button>
          </div>

          {project.projectLeads?.length ? (
            <ul className={"flex flex-wrap gap-x-3 gap-y-1"}>
              {project.projectLeads.map(lead => (
                <li key={lead.id}>
                  <Contributor
                    login={lead.login}
                    githubUserId={lead.githubUserId}
                    avatarUrl={lead.avatarUrl}
                    isRegistered={false}
                    typograhy={{ variant: "body-s-bold" }}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>

      {project.longDescription ? <MarkdownPreview>{project.longDescription}</MarkdownPreview> : null}

      {project.last3monthsMetrics ? (
        <>
          <Typography variant={"title-s"} translate={{ token: "v2.pages.committees.project.metrics.title" }} />
          <ul className={"flex flex-wrap gap-2.5"}>
            {Object.entries(project.last3monthsMetrics).map(([key, value]) => (
              <Tag key={key} as={"li"} shape={"square"}>
                <span>{value}</span>
                <span className={"text-spaceBlue-200"}>
                  <Translate token={`v2.pages.committees.project.metrics.${key}`} params={{ count: value }} />
                </span>
              </Tag>
            ))}
          </ul>
        </>
      ) : null}
    </Card>
  );
}
