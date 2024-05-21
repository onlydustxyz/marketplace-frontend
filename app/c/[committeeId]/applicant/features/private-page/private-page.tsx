import { useGetCommitteeProjectApplication } from "api-client/resources/committees/queries/use-get-committee-project-application";
import { useParams } from "next/navigation";
import { useState } from "react";

import { PrivatePageError } from "app/c/[committeeId]/applicant/features/private-page/private-page.error";
import { ProjectSelection } from "app/c/[committeeId]/applicant/features/project-selection/project-selection";
import { Steps } from "app/c/[committeeId]/applicant/features/steps/steps";

import MarkdownPreview from "src/components/MarkdownPreview";

import { Avatar } from "components/ds/avatar/avatar";
import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Textarea } from "components/ds/form/textarea/textarea";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Tag } from "components/ds/tag/tag";
import { Contributor } from "components/features/contributor/contributor";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

export function CommitteeApplicantPrivatePage() {
  const { committeeId } = useParams();
  const { T } = useIntl();
  const [projectId, setProjectId] = useState("");

  const { data, isError, isLoading } = useGetCommitteeProjectApplication({
    committeeId: typeof committeeId === "string" ? committeeId : "",
    projectId,
  });

  if (isError) {
    return <PrivatePageError />;
  }

  return (
    <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-card-background-base shadow-light">
      <div className="w-full bg-mosaic bg-cover pb-1.5" />

      <div className={"grid gap-8 p-6 md:p-12"}>
        <div className="grid gap-8">
          {isLoading ? <SkeletonEl variant={"rounded"} width={"50%"} height={20} /> : <Steps status={data?.status} />}

          <div className="grid gap-2">
            <Typography
              variant={"title-m"}
              translate={{ token: "v2.pages.committees.applicant.private.create.title" }}
            />
            <Typography
              variant={"body-s"}
              translate={{ token: "v2.pages.committees.applicant.private.create.description" }}
              className={"text-spaceBlue-200"}
            />
          </div>

          <div className={"grid gap-4"}>
            <ProjectSelection projectId={projectId} onChange={setProjectId} isLoading={isLoading} />

            {data?.projectInfos ? (
              <Card className={"grid gap-4 shadow-medium"}>
                <header className={"flex gap-4"}>
                  <Avatar size={"2xl"} shape={"square"} isBordered={false} />

                  <div className={"grid flex-1 gap-2"}>
                    {/* TODO @hayden */}
                    <Typography variant={"title-m"}>PROJECT NAME</Typography>

                    {data.projectInfos.projectLeads?.length ? (
                      <ul className={"flex flex-wrap gap-x-3 gap-y-1"}>
                        {data.projectInfos.projectLeads.map(lead => (
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

                {data.projectInfos.longDescription ? (
                  <MarkdownPreview>{data.projectInfos.longDescription}</MarkdownPreview>
                ) : null}

                {data.projectInfos.last3monthsMetrics ? (
                  <>
                    <Typography
                      variant={"title-s"}
                      translate={{ token: "v2.pages.committees.applicant.private.project.metrics.title" }}
                    />
                    <ul className={"flex flex-wrap gap-2.5"}>
                      {Object.entries(data.projectInfos.last3monthsMetrics).map(([key, value]) => (
                        <Tag key={key} as={"li"} shape={"square"}>
                          <span>{value}</span>
                          <span className={"text-spaceBlue-200"}>
                            {T(`v2.pages.committees.applicant.private.project.metrics.${key}`, { count: value })}
                          </span>
                        </Tag>
                      ))}
                    </ul>
                  </>
                ) : null}
              </Card>
            ) : null}
          </div>

          {data?.projectQuestions.length ? (
            <div className={"grid gap-8"}>
              <div className="grid gap-2">
                <Typography
                  variant={"title-m"}
                  translate={{ token: "v2.pages.committees.applicant.private.questions.title" }}
                />
                <Typography
                  variant={"body-s"}
                  translate={{ token: "v2.pages.committees.applicant.private.questions.description" }}
                  className={"text-spaceBlue-200"}
                />
              </div>

              <ul className={"grid gap-6"}>
                {data.projectQuestions.map(q => (
                  <li key={q.id}>
                    <Textarea label={q.question} isRequired={q.required} defaultValue={q.answer} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <footer className="flex w-full justify-end border-t border-card-border-light bg-card-background-base p-6">
        <Button
          type={"submit"}
          size={"l"}
          backgroundColor={"blue"}
          className="w-full md:w-auto"
          disabled={isLoading}
          // TODO @hayden handle button loading on submit
        >
          <Icon remixName={"ri-check-line"} size={24} /> {T("v2.commons.form.submit")}
        </Button>
      </footer>
    </div>
  );
}
