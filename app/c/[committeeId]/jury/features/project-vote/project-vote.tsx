import { zodResolver } from "@hookform/resolvers/zod";
import { meApiClient } from "api-client/resources/me";
import { useContext } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { TProjectVote } from "app/c/[committeeId]/jury/features/project-vote/project-vote.types";
import { StatusContext } from "app/c/[committeeId]/jury/utils/status-context";

import useMutationAlert from "src/api/useMutationAlert";
import { Spinner } from "src/components/Spinner/Spinner";

import { Button } from "components/ds/button/button";
import { DustScore } from "components/features/dust-score/dust-score";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

export function ProjectVote({ votes }: TProjectVote.Props) {
  const { T } = useIntl();

  const status = useContext(StatusContext);
  const canVote = status === "OPEN_TO_VOTES";

  const {
    mutate: _m,
    isPending,
    ...restMutation
  } = meApiClient.mutations.useUpdateCommitteeProjectApplication({
    committeeId: "committeeId",
    projectId: "projectId",
  });

  useMutationAlert({
    mutation: restMutation,
    success: {
      message: T("v2.pages.committees.jury.private.form.success"),
    },
    error: {
      default: true,
    },
  });

  const { handleSubmit, control, setValue, formState } = useForm<TProjectVote.form>({
    mode: "all",
    resolver: zodResolver(TProjectVote.validation),
    defaultValues: {
      votes,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "votes",
  });

  function handleFormSubmit(values: TProjectVote.form) {
    if (!canVote) return null;

    // TODO @hayden test when contract has been updated
    console.log({ values });

    // mutate({
    //   votes: values.votes.map(v => ({
    //     criteriaId: v.criteriaId,
    //     vote: v.vote,
    //   })),
    // });
    // TODO @hayden invalidate/refetch
  }

  return (
    <form className={"grid gap-6 p-4"} onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography
        variant={"title-s"}
        translate={{
          token: canVote
            ? "v2.pages.committees.jury.private.form.titleVote"
            : "v2.pages.committees.jury.private.form.titleReadonly",
        }}
        className={"text-greyscale-50"}
      />

      <ul className={"grid gap-3"}>
        {fields.map((f, index) => (
          <li key={f.id}>
            <Controller
              control={control}
              name={`votes.${index}`}
              render={({ field, fieldState }) => {
                return (
                  <li className={"flex items-start justify-between gap-3"}>
                    <Typography variant={"body-s-bold"} className={"pt-1 text-spaceBlue-200"}>
                      {f.criteria}
                    </Typography>
                    <div className={"shrink-0"}>
                      <DustScore
                        canUpdate={canVote}
                        initialScore={f.vote ?? 0}
                        onScoreChange={vote =>
                          setValue(
                            `votes.${index}`,
                            {
                              ...field.value,
                              vote,
                            },
                            { shouldDirty: true, shouldValidate: true }
                          )
                        }
                        isSmall
                      />
                    </div>
                    {fieldState.error?.message}
                  </li>
                );
              }}
            />
          </li>
        ))}
      </ul>

      {canVote ? (
        <footer className={"flex justify-end"}>
          <Button
            type={"submit"}
            size={"s"}
            backgroundColor={"blue"}
            className="w-full md:w-auto"
            disabled={!formState.isValid || isPending}
          >
            {isPending ? <Spinner className="h-4 w-4" /> : <Icon remixName={"ri-check-line"} size={16} />}
            <Translate token={"v2.commons.form.submit"} />
          </Button>
        </footer>
      ) : null}
    </form>
  );
}
