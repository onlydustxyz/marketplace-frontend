import { zodResolver } from "@hookform/resolvers/zod";
import { committeeApiClient } from "api-client/resources/committees";
import { GetCommitteeProjectApplicationResponse } from "api-client/resources/committees/types";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { PrivatePageError } from "app/c/[committeeId]/applicant/features/private-page/private-page.error";
import { TPrivatePage } from "app/c/[committeeId]/applicant/features/private-page/private-page.types";
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

  const isInitialLoadingRef = useRef(true);
  const statusRef = useRef<GetCommitteeProjectApplicationResponse["status"]>();

  const { data, isError, isLoading } = committeeApiClient.queries.useGetCommitteeProjectApplication({
    committeeId: typeof committeeId === "string" ? committeeId : "",
    projectId,
  });

  const { handleSubmit, setValue, control, formState, watch } = useForm<TPrivatePage.form>({
    mode: "all",
    resolver: zodResolver(TPrivatePage.validation),
    defaultValues: {
      projectId: "",
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "answers",
  });

  const answers = watch("answers");

  useEffect(() => {
    if (data) {
      isInitialLoadingRef.current = false;
      statusRef.current = data.status;
    }
  }, [data]);

  useEffect(() => {
    if (data && !answers?.length) {
      replace(
        data.projectQuestions.map(q => ({
          questionId: q.id,
          question: q.question,
          required: q.required,
          answer: q.answer || "",
        }))
      );
    }
  }, [data, answers]);

  function handleProjectChange(projectId: string) {
    setProjectId(projectId);
    setValue("projectId", projectId, { shouldDirty: true, shouldValidate: true });
  }

  function handleFormSubmit(values: TPrivatePage.form) {
    // TODO @hayden handle form submit

    console.log({ values });
  }

  if (isError) {
    return <PrivatePageError />;
  }

  return (
    <form
      className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-card-background-base shadow-light"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="w-full bg-mosaic bg-cover pb-1.5" />

      <div className={"grid gap-8 p-6 md:p-12"}>
        <div className="grid gap-8">
          {isInitialLoadingRef.current ? (
            <SkeletonEl variant={"rounded"} width={"50%"} height={20} />
          ) : (
            <Steps status={statusRef.current} />
          )}

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
            <ProjectSelection projectId={projectId} onChange={handleProjectChange} isLoading={isLoading} />

            {data?.projectInfos ? (
              <Card className={"grid gap-4 shadow-medium"}>
                <header className={"flex gap-4"}>
                  <Avatar src={data.projectInfos.logoUrl} size={"2xl"} shape={"square"} isBordered={false} />

                  <div className={"grid flex-1 gap-2"}>
                    <Typography variant={"title-m"}>{data.projectInfos.name}</Typography>

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
              {isInitialLoadingRef.current ? (
                <li>
                  <SkeletonEl variant={"rounded"} width={"100%"} height={90} />
                </li>
              ) : null}

              {fields.map((f, index) => (
                <li key={f.questionId}>
                  <Controller
                    render={({ field, fieldState }) => {
                      console.log("fieldState.error?.message}", fieldState.error);
                      return (
                        <Textarea
                          {...field}
                          value={field.value.answer}
                          label={f.question}
                          isRequired={f.required}
                          isInvalid={!!fieldState.error?.message && fieldState.isDirty}
                          onChange={e =>
                            setValue(
                              `answers.${index}`,
                              {
                                ...field.value,
                                answer: e.target.value,
                              },
                              { shouldDirty: true, shouldValidate: true }
                            )
                          }
                        />
                      );
                    }}
                    name={`answers.${index}`}
                    control={control}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <footer className="flex w-full justify-end border-t border-card-border-light bg-card-background-base p-6">
        <Button
          type={"submit"}
          size={"l"}
          backgroundColor={"blue"}
          className="w-full md:w-auto"
          disabled={isLoading || !formState.isValid}
          // TODO @hayden handle button loading on submit
        >
          <Icon remixName={"ri-check-line"} size={24} /> {T("v2.commons.form.submit")}
        </Button>
      </footer>
    </form>
  );
}
