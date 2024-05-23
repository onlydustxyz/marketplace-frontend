import { zodResolver } from "@hookform/resolvers/zod";
import { committeeApiClient } from "api-client/resources/committees";
import { GetCommitteeProjectApplicationResponse } from "api-client/resources/committees/types";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { PrivatePageError } from "app/c/[committeeId]/applicant/features/private-page/private-page.error";
import { TPrivatePage } from "app/c/[committeeId]/applicant/features/private-page/private-page.types";
import { ProjectSelection } from "app/c/[committeeId]/applicant/features/project-selection/project-selection";
import { ReadOnlySection } from "app/c/[committeeId]/applicant/features/read-only-section/read-only-section";
import { Steps } from "app/c/[committeeId]/applicant/features/steps/steps";

import useMutationAlert from "src/api/useMutationAlert";
import { IMAGES } from "src/assets/img";
import MarkdownPreview from "src/components/MarkdownPreview";
import { Spinner } from "src/components/Spinner/Spinner";

import { Avatar } from "components/ds/avatar/avatar";
import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Textarea } from "components/ds/form/textarea/textarea";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Tag } from "components/ds/tag/tag";
import { Contributor } from "components/features/contributor/contributor";
import { Icon } from "components/layout/icon/icon";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { Key, useIntl } from "hooks/translate/use-translate";

export function CommitteeApplicantPrivatePage() {
  const { T } = useIntl();
  const router = useRouter();
  const pathname = usePathname();
  const { committeeId } = useParams();
  const searchParams = useSearchParams();
  const initialProjectId = searchParams.get("p") ?? "";
  const [projectId, setProjectId] = useState(initialProjectId);

  const isInitialLoadingRef = useRef(true);
  const statusRef = useRef<GetCommitteeProjectApplicationResponse["status"]>();

  const {
    data,
    isError,
    isFetching,
    refetch: refetchCommetteeProjectApplication,
  } = committeeApiClient.queries.useGetCommitteeProjectApplication({
    committeeId: typeof committeeId === "string" ? committeeId : "",
    projectId,
  });

  useEffect(() => {
    if (isError && initialProjectId) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("p");
      router.push(pathname + "?" + params.toString());
      setProjectId("");
    }
  }, [isError, initialProjectId]);

  const { isPending, ...restMutation } = committeeApiClient.mutations.useUpdateCommitteeProjectApplication({
    committeeId: typeof committeeId === "string" ? committeeId : "",
    projectId,
  });

  useMutationAlert({
    mutation: restMutation,
    success: {
      message: T("v2.pages.committees.applicant.private.form.success"),
    },
    error: {
      default: true,
    },
  });

  const { handleSubmit, setValue, control, formState, reset } = useForm<TPrivatePage.form>({
    mode: "all",
    resolver: zodResolver(TPrivatePage.validation),
    defaultValues: {
      projectId,
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "answers",
  });

  const canSubmit = useMemo(() => data?.status === "OPEN_TO_APPLICATIONS", [data]);

  useEffect(() => {
    if (data) {
      isInitialLoadingRef.current = false;
      statusRef.current = data.status;
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      replace(
        data.projectQuestions.map(q => ({
          questionId: q.id,
          question: q.question,
          required: q.required,
          answer: q.answer || "",
        }))
      );
    }
  }, [data]);

  function handleProjectChange(projectId: string) {
    setProjectId(projectId);
    setValue("projectId", projectId, { shouldDirty: true, shouldValidate: true });

    const params = new URLSearchParams(searchParams.toString());
    params.set("p", projectId);
    router.replace(pathname + "?" + params.toString());

    reset({ projectId });
  }

  function handleFormSubmit(values: TPrivatePage.form) {
    if (!canSubmit) return;

    restMutation
      .mutateAsync({
        answers: values.answers.map(a => ({
          questionId: a.questionId,
          answer: a.answer,
        })),
      })
      .then(() => {
        refetchCommetteeProjectApplication();
      });
  }

  const renderMainTitle = useMemo(() => {
    if (!data) {
      return (
        <div className="grid gap-2">
          <SkeletonEl variant={"rounded"} width={"33%"} height={32} />
          <SkeletonEl variant={"rounded"} width={"100%"} height={16} />
        </div>
      );
    }

    let title: Key = "";
    let description: Key = "";

    switch (data.status) {
      case "OPEN_TO_APPLICATIONS": {
        if (!data.hasStartedApplication) {
          title = "v2.pages.committees.applicant.private.create.title";
          description = "v2.pages.committees.applicant.private.create.description";
        } else {
          title = "v2.pages.committees.applicant.private.update.title";
          description = "v2.pages.committees.applicant.private.update.description";
        }
        break;
      }
      case "OPEN_TO_VOTES":
        title = "v2.pages.committees.applicant.private.voting.title";
        description = "v2.pages.committees.applicant.private.voting.description";
        break;
      case "CLOSED":
        title = "v2.pages.committees.applicant.private.closed.title";
        description = "v2.pages.committees.applicant.private.closed.description";
        break;
    }

    return (
      <div className="grid gap-2">
        <Typography variant={"title-m"} translate={{ token: title }} />
        <Typography
          variant={"body-s"}
          translate={{
            token: description,
            params: {
              // TODO
              date: "123",
            },
          }}
          className={"text-spaceBlue-200"}
        />
      </div>
    );
  }, [canSubmit, data]);

  const renderTitleQuestionSection = useMemo(() => {
    if (canSubmit) {
      return (
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
      );
    }

    return (
      <Typography variant={"title-m"} translate={{ token: "v2.pages.committees.applicant.private.answers.title" }} />
    );
  }, [canSubmit]);

  const renderQuestionSection = useMemo(() => {
    if (canSubmit) {
      return (
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
                  return (
                    <Textarea
                      {...field}
                      value={field.value?.answer || f.answer}
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
      );
    }

    return <ReadOnlySection questions={data?.projectQuestions || []} />;
  }, [canSubmit, data, fields, isInitialLoadingRef.current]);

  if (isError) {
    return <PrivatePageError />;
  }

  return (
    <form
      className="relative flex w-[740px] max-w-full flex-col overflow-hidden rounded-2xl bg-card-background-base shadow-light"
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

          {renderMainTitle}

          {data?.projectInfos && !data?.hasStartedApplication && !canSubmit ? (
            <>
              <ProjectSelection projectId={projectId} onChange={handleProjectChange} isLoading={isFetching} />
              <EmptyState
                illustrationSrc={IMAGES.svg.technology}
                title={{ token: "v2.pages.committees.applicant.private.empty.title" }}
                description={{ token: "v2.pages.committees.applicant.private.empty.description" }}
              />
            </>
          ) : (
            <>
              <div className={"grid gap-4"}>
                <ProjectSelection projectId={projectId} onChange={handleProjectChange} isLoading={isFetching} />

                {data?.projectInfos ? (
                  <Card className={"grid gap-4 shadow-light"}>
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

              {data?.projectInfos?.id && data?.projectQuestions.length ? (
                <div className={"grid gap-8"}>
                  {renderTitleQuestionSection}
                  {renderQuestionSection}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      {canSubmit && data?.projectInfos ? (
        <footer className="flex w-full justify-end border-t border-card-border-light bg-card-background-base p-6">
          <Button
            type={"submit"}
            size={"l"}
            backgroundColor={"blue"}
            className="w-full md:w-auto"
            disabled={isFetching || !formState.isValid || isPending}
          >
            {isPending ? <Spinner className="h-4 w-4" /> : <Icon remixName={"ri-check-line"} size={24} />}{" "}
            <Translate token={data?.hasStartedApplication ? "v2.commons.form.update" : "v2.commons.form.submit"} />
          </Button>
        </footer>
      ) : null}
    </form>
  );
}
