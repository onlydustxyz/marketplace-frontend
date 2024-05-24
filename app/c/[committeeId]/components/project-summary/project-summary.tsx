import { TProjectSummary } from "app/c/[committeeId]/components/project-summary/project-summary.types";

import MarkdownPreview from "src/components/MarkdownPreview";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Tag } from "components/ds/tag/tag";
import { Contributor } from "components/features/contributor/contributor";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function ProjectSummary({ project }: TProjectSummary.Props) {
  if (!project) return null;

  return (
    <Card className={"grid gap-4 shadow-light"}>
      <header className={"flex gap-4"}>
        <Avatar src={project.logoUrl} size={"2xl"} shape={"square"} isBordered={false} />

        <div className={"grid flex-1 gap-2"}>
          <Typography variant={"title-m"}>{project.name}</Typography>

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
